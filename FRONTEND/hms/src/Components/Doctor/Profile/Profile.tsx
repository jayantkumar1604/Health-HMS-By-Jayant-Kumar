import React, { useState, useEffect } from "react";
import { DateInput } from '@mantine/dates';
import { NumberInput } from '@mantine/core';
import { Select } from '@mantine/core';
import { Avatar, Text, Divider, Table, Button, TextInput } from "@mantine/core";
import { useSelector } from "react-redux";
import { IconEdit } from "@tabler/icons-react";
import { TagsInput } from '@mantine/core';
import {doctorSpecializations, doctorDepartments} from "../../../Data/DropdownData"
import { useDisclosure } from '@mantine/hooks';
import { Modal} from '@mantine/core';
import { useForm } from "@mantine/form";
import {getDoctor, updateDoctor} from "../../../Service/DoctorProfileService";
import {errorNotification, successNotification} from "../../../Utility/NotificationUtil";
import {formatDate} from "../../../Utility/DateUtility";
const doctor: any = {
    name: "Dr. Michael Smith",
    email: "michael.smith@example.com",
    dob: "1985-08-12",
    phone: "+91 9876543210",
    address: "45, Park Avenue, Delhi",
    licenseNo: "MED-IND-456789",
    specialization: "Cardiologist",
    department: "Cardiology",
    totalExp: "12 Years",
    profilePicture: "https://randomuser.me/api/portraits/men/75.jpg"
};


const Profile = () => {
    const user = useSelector((state:any)=>state.user);
    const [opened,{open,close}]=useDisclosure(false);
    const [editMode, setEdit] = useState(false);
    const [profile, setProfile] = useState<any>({});
    useEffect(() => {
        console.log(user);
        getDoctor(user.profileId).then((data)=>{
            setProfile({
                ...data
            });
            console.log(data);
        }).catch((error)=>{
            console.log(error);
        })
    }, [])

    const form = useForm({
        initialValues: {
            dob: '',
            phone: '',
            address: '',
            licenseNo: '',
            specialization: '',
            department: '',
            totalExp: '',
        },

        validate: {
            dob: (value: any) => !value ? 'Date of Birth is required' : undefined,
            phone: (value: any) => !value ? 'Phone number is required' : undefined,
            address: (value: any) => !value ? 'Address is required' : undefined,
            licenseNo: (value: any) => !value ? 'License number is required' : undefined,
        }
    });
    const handleEdit = () => {
        form.setValues({
            ...profile,dob: profile.dob ? new Date(profile.dob) : undefined
        });

        setEdit(true);
    }
    const handleSubmit = (e:any) => {
        let values = form.getValues();
        form.validate();
        if (!form.isValid()) return;
        console.log(values);
        updateDoctor({
            ...profile,
            ...values
        })
            .then((data) => {
                successNotification("Profile updated successfully.");
                setProfile({...profile, ...values});
                setEdit(false);
            })
            .catch((error) => {
                errorNotification(error.response?.data?.errorMessage || "Update failed");
            })
    }
    return (
        <div className="p-10">
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
                {!editMode ? <Button type="button" size="lg" onClick={handleEdit} variant="filled" leftSection={<IconEdit />} >Edit</Button> :
                    <Button onClick={handleSubmit} size="lg" type="submit" variant="filled">Submit</Button>}
            </div>
            <Divider my="xl" />
            <div>
                <div className="text-2xl font-medium mb-5 text-neutral-900">Personal Information</div>
                <Table striped stripedColor="teal.1" verticalSpacing="md" withRowBorders={false}>
                    <Table.Tbody className="[&>tr]:!mb-3 [&_td]:!w-1/2">
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
                    <Table.Td className="font-semibold text-xl">License Number</Table.Td>
                    {editMode ? <Table.Td className="text-xl"> <TextInput {...form.getInputProps("licenseNo")} placeholder="License number" /></Table.Td> : <Table.Td className="text-xl"> {profile.licenseNo ?? '_'}</Table.Td>}
                </Table.Tr>

                <Table.Tr>
                    <Table.Td className="font-semibold text-xl">Specialization</Table.Td>
                    {editMode ? <Table.Td className="text-xl"> <Select {...form.getInputProps("specialization")} placeholder="Specialization" data={doctorSpecializations}/></Table.Td> : <Table.Td className="text-xl"> {profile.specialization ?? '_'}</Table.Td>}
                </Table.Tr>

                    <Table.Tr>
                        <Table.Td className="font-semibold text-xl">Department</Table.Td>
                        {editMode ? <Table.Td className="text-xl"> <Select {...form.getInputProps("department")} placeholder="Department" data={doctorDepartments}/></Table.Td> : <Table.Td className="text-xl"> {profile.department ?? '_'}</Table.Td>}
                    </Table.Tr>

                <Table.Tr>
                    <Table.Td className="font-semibold text-xl">Total Experience</Table.Td>
                    {editMode ? <Table.Td className="text-xl"><NumberInput {...form.getInputProps("totalExp")} maxLength={2} max={50} clampBehavior='strict' placeholder="Total Experience" hideControls/></Table.Td> : <Table.Td className="text-xl">{profile.totalExp ?? '_'} {profile.totalExp?'years':''}</Table.Td>}
                </Table.Tr>
                </Table.Tbody>
            </Table>
            </div>
            <Modal centered opened={opened} onClose={close} title={<span className="text-xl medium">Upload Profile Picture</span>}>
            </Modal>
        </div>
    );
};

export default Profile;