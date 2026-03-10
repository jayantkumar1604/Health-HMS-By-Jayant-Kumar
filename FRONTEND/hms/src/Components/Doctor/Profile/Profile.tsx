
import { getDoctor } from "../../../Service/DoctorProfileService";
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
import React, { useState, useEffect } from "react";
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
    const [profile, setProfile] = useState<any>({});
    const [editMode, setEdit] = useState(false);
    useEffect(() => {
        getDoctor(user.profileId).then((data)=>{
            setProfile(data);
        }).catch((error)=>{
            console.log(error);
        })
    }, []);
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
                {!editMode ? <Button size="lg" onClick={()=> setEdit(true)} variant="filled" leftSection={<IconEdit />} >Edit</Button> :
                    <Button size="lg" onClick={()=>setEdit(false)} variant="filled">Submit</Button>}
            </div>
            <Divider my="xl" />
            <div>
                <div className="text-2xl font-medium mb-5 text-neutral-900">Personal Information</div>
                <Table striped stripedColor="teal.1" verticalSpacing="md" withRowBorders={false}>
                <Table.Tbody className="[&>tr]:!mb-3">
                <Table.Tr>
                    <Table.Td className="font-semibold text-xl">Date of Birth</Table.Td>
                    {editMode ? <Table.Td className="text-xl"> <DateInput placeholder="Date input"
                    /></Table.Td> : <Table.Td className="text-xl"> {doctor.dob}</Table.Td>}
                </Table.Tr>

                <Table.Tr>
                    <Table.Td className="font-semibold text-xl">Phone</Table.Td>
                    {editMode ? <Table.Td className="text-xl"> <NumberInput maxLength={10} clampBehavior="strict" placeholder="Phone number" hideControls /></Table.Td> : <Table.Td className="text-xl"> {doctor.phone}</Table.Td>}
                </Table.Tr>

                <Table.Tr>
                    <Table.Td className="font-semibold text-xl">Address</Table.Td>
                    {editMode ? <Table.Td className="text-xl"> <TextInput placeholder="Address" /></Table.Td> : <Table.Td className="text-xl"> {doctor.address}</Table.Td>}
                </Table.Tr>

                <Table.Tr>
                    <Table.Td className="font-semibold text-xl">License Number</Table.Td>
                    {editMode ? <Table.Td className="text-xl"> <NumberInput maxLength={12} clampBehavior="strict" placeholder="Aadhar number" hideControls /></Table.Td> : <Table.Td className="text-xl"> {doctor.licenseNo}</Table.Td>}
                </Table.Tr>

                <Table.Tr>
                    <Table.Td className="font-semibold text-xl">Specialization</Table.Td>
                    {editMode ? <Table.Td className="text-xl"> <Select placeholder="Specialization" data={doctorSpecializations}/></Table.Td> : <Table.Td className="text-xl"> {doctor.specialization}</Table.Td>}
                </Table.Tr>

                    <Table.Tr>
                        <Table.Td className="font-semibold text-xl">Department</Table.Td>
                        {editMode ? <Table.Td className="text-xl"> <Select placeholder="Department" data={doctorDepartments}/></Table.Td> : <Table.Td className="text-xl"> {doctor.department}</Table.Td>}
                    </Table.Tr>

                <Table.Tr>
                    <Table.Td className="font-semibold text-xl">Total Experience</Table.Td>
                    {editMode ? <Table.Td className="text-xl"><NumberInput maxLength={2} max={50} clampBehavior='strict' placeholder="Total Experience" hideControls/></Table.Td> : <Table.Td className="text-xl">{doctor.totalExp} years</Table.Td>}
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