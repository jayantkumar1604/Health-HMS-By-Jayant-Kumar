import React, { useState, useEffect } from "react";
import { DateInput } from '@mantine/dates';
import { NumberInput } from '@mantine/core';
import { Select } from '@mantine/core';
import { getPatient, updatePatient } from "../../../Service/PatientProfileService";
import { Avatar, Text, Divider, Table, Button, TextInput } from "@mantine/core";
import { useSelector } from "react-redux";
import { IconEdit } from "@tabler/icons-react";
import { TagsInput } from '@mantine/core';
import {bloodGroups} from "../../../Data/DropdownData"
import { useDisclosure } from '@mantine/hooks';
import { Modal} from '@mantine/core';
import { useForm } from '@mantine/form';
import {formatDate} from "../../../Utility/DateUtility"
import {errorNotification} from "../../../Utility/NotificationUtil"

const patient:any = {
        name: "John Doe",
        email: "john.doe@example.com",
        dob: "1990-05-15",
        phone: "+91 9876543210",
        address: "123, Main Street, Mumbai",
        aadharNo: "1234-5678-9012",
        bloodGroup: "O+",
        allergies: "Peanuts",
        chronicDisease: "Diabetes",
        profilePictures: "http://randomuser.me/api/protraits/men/75.jpd",
};


const Profile = () => {
    const user = useSelector((state:any)=>state.user);
    const [opened,{open,close}]=useDisclosure(false);
    const [editMode,setEdit]=useState(false);
    const [profile, setProfile] = useState<any>({});
    useEffect(() => {
        console.log(user);
        getPatient(user.profileId).then((data)=>{
            setProfile(data);
            console.log(data);
        }).catch((error)=>{
            console.log(error);
        })
    }, [])

    const form = useForm({
        initialValues: {
            dob: profile.dob,
            phone: profile.phone,
            address: profile.address,
            aadharNo: profile.aadharNo,
            bloodGroup: profile.bloodGroup,
            allergies: profile.allergies,
            chronicDisease: profile.chronicDisease
        },

        validate: {
            dob: (value: any) => !value ? 'Date of Birth is required' : undefined,
            phone: (value: any) => !value ? 'Phone number is required' : undefined,
            address: (value: any) => !value ? 'Address is required' : undefined,
            aadharNo: (value: any) => !value ? 'Aadhar number is required' : undefined,
        }
    });

    const handleSubmit = (values:any) => {
        updatePatient({...profile,...values}).then((data)=>{
            setEdit(false);
        }).catch((error)=>{
            errorNotification(error.response.data.errorMessage);
        })
    }
    return (
        <form onSubmit={form.onSubmit(handleSubmit)} className="p-10">
            <div className="flex justify-between items-start">
                <div className="flex gap-5 items-center">
                    <div className="flex flex-col items-centre gap-3">
                        <Avatar variant='filled' src="/avatar.png" size="150" alt="it's me"/>
                        {editMode && <Button size="sm" onClick={open} variant="filled">Upload</Button>}
                    </div>
                <div className="flex flex-col gap-3">
                    <div className="text-3xl font-medium text-neutral-900">{user?.name} </div>
                    <div className="text-xl text-neutral-700">{user?.email} </div>
                </div>
            </div>
                {!editMode ? <Button type="button" size="lg" onClick={()=> setEdit(true)} variant="filled" leftSection={<IconEdit />} >Edit</Button> :
                    <Button size="lg" type="submit" variant="filled">Submit</Button>}
            </div>
            <Divider my="xl" />
            <div>
                <div className="text-2xl font-medium mb-5 text-neutral-900">Personal Information</div>
                <Table striped stripedColor="teal.1" verticalSpacing="md" withRowBorders={false}>
                <Table.Tbody className="[&>tr]:!mb-3">
                <Table.Tr>
                    <Table.Td className="font-semibold text-xl">Date of Birth</Table.Td>
                    {editMode ? <Table.Td className="text-xl"> <DateInput {...form.getInputProps("dob")} placeholder="Date input"
                    /></Table.Td> : <Table.Td className="text-xl"> {formatDate(profile.dob)?? '_'}</Table.Td>}
                </Table.Tr>

                <Table.Tr>
                    <Table.Td className="font-semibold text-xl">Phone</Table.Td>
                    {editMode ? <Table.Td className="text-xl"> <NumberInput {...form.getInputProps("phone")} maxLength={10} clampBehavior="strict" placeholder="Phone number" hideControls /></Table.Td> : <Table.Td className="text-xl"> {profile.phone?? '_'}</Table.Td>}
                </Table.Tr>

                <Table.Tr>
                    <Table.Td className="font-semibold text-xl">Address</Table.Td>
                    {editMode ? <Table.Td className="text-xl"> <TextInput {...form.getInputProps("address")} placeholder="Address" /></Table.Td> : <Table.Td className="text-xl"> {profile.address?? '_'}</Table.Td>}
                </Table.Tr>

                <Table.Tr>
                    <Table.Td className="font-semibold text-xl">Aadhar Number</Table.Td>
                    {editMode ? <Table.Td className="text-xl"> <NumberInput {...form.getInputProps("aadharNo")} maxLength={12} clampBehavior="strict" placeholder="Aadhar number" hideControls /></Table.Td> : <Table.Td className="text-xl"> {profile.aadharNo?? '_'}</Table.Td>}
                </Table.Tr>

                <Table.Tr>
                    <Table.Td className="font-semibold text-xl">Blood Group</Table.Td>
                    {editMode ? <Table.Td className="text-xl"> <Select {...form.getInputProps("bloodGroup")} placeholder="Blood Group" data={bloodGroups}/></Table.Td> : <Table.Td className="text-xl"> {profile.bloodGroup?? '_'}</Table.Td>}
                </Table.Tr>

                <Table.Tr>
                    <Table.Td className="font-semibold text-xl">Allergies</Table.Td>
                    {editMode ? <Table.Td className="text-xl"> <TagsInput {...form.getInputProps("allergies")} placeholder="Allergies separated by comma" /></Table.Td> : <Table.Td className="text-xl">{profile.allergies?? '_'}</Table.Td>}
                </Table.Tr>

                <Table.Tr>
                    <Table.Td className="font-semibold text-xl">Chronic Disease</Table.Td>
                    {editMode ? <Table.Td className="text-xl"><TagsInput {...form.getInputProps("chronicDisease")} placeholder="Chronic Disease separated by comma" /></Table.Td> : <Table.Td className="text-xl">{profile.chronicDisease ?? '_'}</Table.Td>}
                </Table.Tr>
                </Table.Tbody>
            </Table>
            </div>
            <Modal centered opened={opened} onClose={close} title={<span className="text-xl medium">Upload Profile Picture</span>}>
            </Modal>
        </form>
    );
};

export default Profile;