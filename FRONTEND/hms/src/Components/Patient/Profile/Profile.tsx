
import { DateInput } from '@mantine/dates';
import { NumberInput } from '@mantine/core';
import { Select } from '@mantine/core';
import React, { useState } from 'react';
import { Avatar, Text, Divider, Table, Button, TextInput } from "@mantine/core";
import { useSelector } from "react-redux";
import { IconEdit } from "@tabler/icons-react";
import { TagsInput } from '@mantine/core';
import {bloodGroups} from "../../../Data/DropdownData"

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
    const [editMode,setEdit]=useState(false);
    return (
        <div className="p-10">
            <div className="flex justify-between items-start">
            <div className="flex gap-5 items-center">

                <Avatar variant='filled' src="/avatar.png" size="150" alt="it's me"/>
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
                    /></Table.Td> : <Table.Td className="text-xl"> {patient.dob}</Table.Td>}
                </Table.Tr>

                <Table.Tr>
                    <Table.Td className="font-semibold text-xl">Phone</Table.Td>
                    {editMode ? <Table.Td className="text-xl"> <NumberInput maxLength={10} clampBehavior="strict" placeholder="Phone number" hideControls /></Table.Td> : <Table.Td className="text-xl"> {patient.phone}</Table.Td>}
                </Table.Tr>

                <Table.Tr>
                    <Table.Td className="font-semibold text-xl">Address</Table.Td>
                    {editMode ? <Table.Td className="text-xl"> <TextInput placeholder="Address" /></Table.Td> : <Table.Td className="text-xl"> {patient.address}</Table.Td>}
                </Table.Tr>

                <Table.Tr>
                    <Table.Td className="font-semibold text-xl">Aadhar Number</Table.Td>
                    {editMode ? <Table.Td className="text-xl"> <NumberInput maxLength={12} clampBehavior="strict" placeholder="Aadhar number" hideControls /></Table.Td> : <Table.Td className="text-xl"> {patient.aadharNo}</Table.Td>}
                </Table.Tr>

                <Table.Tr>
                    <Table.Td className="font-semibold text-xl">Blood Group</Table.Td>
                    {editMode ? <Table.Td className="text-xl"> <Select placeholder="Blood Group" data={bloodGroups}/></Table.Td> : <Table.Td className="text-xl"> {patient.bloodGroup}</Table.Td>}
                </Table.Tr>

                <Table.Tr>
                    <Table.Td className="font-semibold text-xl">Allergies</Table.Td>
                    {editMode ? <Table.Td className="text-xl"> <TagsInput placeholder="Allergies separated by comma" /></Table.Td> : <Table.Td className="text-xl">{patient.allergies}</Table.Td>}
                </Table.Tr>

                <Table.Tr>
                    <Table.Td className="font-semibold text-xl">Chronic Disease</Table.Td>
                    {editMode ? <Table.Td className="text-xl"><TagsInput placeholder="Chronic Disease separated by comma" /></Table.Td> : <Table.Td className="text-xl">{patient.chronicDisease}</Table.Td>}
                </Table.Tr>
                </Table.Tbody>
            </Table>
            </div>
        </div>
    );
};

export default Profile;