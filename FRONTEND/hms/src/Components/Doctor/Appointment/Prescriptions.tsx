import React from 'react';
import {DataTable, DataTableFilterMeta} from "primereact/datatable";
import {getPrescriptionsByPatientId} from "../../../Service/AppointmentService"
import {IconSearch,IconTrash,IconEye,IconMedicineSyrup} from '@tabler/icons-react';
import {formatDate} from "../../../Utility/DateUtility"
import { Column } from 'primereact/column';
import { TextInput ,ActionIcon, Modal,Card, Text, Title, Grid, Divider, Badge, Group } from '@mantine/core';
import {useState,useEffect} from "react";
import { FilterMatchMode} from 'primereact/api';
import {useNavigate} from "react-router-dom";
import {useDisclosure} from "@mantine/hooks"

const Prescriptions = ({appointment}:any) => {
    const [opened,{open,close}]=useDisclosure(false);
    const [medicineData, setMedicineData] = useState<any[]>([]);
    const [data,setData] = useState<any[]>([]);
    const navigate=useNavigate();
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters:any = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    useEffect(() => {
        if (!appointment?.patientId) return;

        getPrescriptionsByPatientId(appointment.patientId)
            .then((res) => {
                console.log("Prescriptions Data:", res);
                setData(res);
            })
            .catch((err) => {
                console.error("Error fetching prescriptions:", err);
            });

    }, [appointment?.patientId]);
    const handleMedicine=(medicine:any[])=>{
        open();
        setMedicineData(medicine);
    }
    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-end items-center">

                <TextInput leftSection={<IconSearch />} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </div>
        );
    };

    const actionBodyTemplate = (rowData:any) => {
        return <div className='flex gap-2'>
            <ActionIcon onClick={() => navigate("/doctor/appointments/"+ rowData.appointmentId)}>
                <IconEye size={20} stroke={1.5} />
            </ActionIcon>

            <ActionIcon color="red" onClick={() =>handleMedicine(rowData.medicines) }>
                <IconMedicineSyrup size={20} stroke={1.5} />
            </ActionIcon>

        </div>
    };
    const header = renderHeader();
    return (
    <div>
        <DataTable stripedRows header={header} value={data} size='small' rows={10}
                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                   rowsPerPageOptions={[10, 25, 50]} dataKey="id"
                   filters={filters} filterDisplay="menu" globalFilterFields={['doctorName', 'notes']}
                   emptyMessage="No appointment found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
            <Column field="doctorName" header="Doctor" />

            <Column field="prescriptionDate" header="Prescription Date" sortable body={(rowData)=>formatDate(rowData.prescriptionDate)} />
            <Column field="medicine" header="Medicines" body={(rowData)=>rowData.medicines?.length??0} />
            <Column field="notes" header="Notes"  style={{ minWidth: '14rem' }} />
            <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
        </DataTable>
        <Modal opened={opened} size="xl" onClose={close} title="Medicines" centered>
            <div className="grid grid-cols-3 gap-5">


            {
                medicineData?.map((data:any,index:number)=>(
            <Card key={index} shadow="md" radius="md" padding="lg" withBorder>

                {/* Header */}
                <Group justify="space-between" mb="xs">
                    <Title order={4}>{data.name}</Title>
                    <Badge color={data.type === "Tablet" ? "green" : "orange"} variant="light">
                        {data.type}
                    </Badge>
                </Group>

                <Divider my="sm" />

                {/* Info Grid */}
                <Grid>

                    <Grid.Col span={6}>
                        <Text size="xs" c="dimmed">Dosage</Text>
                        <Text fw={500}>{data.dosage}</Text>
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <Text size="xs" c="dimmed">Frequency</Text>
                        <Text fw={500}>{data.frequency}</Text>
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <Text size="xs" c="dimmed">Duration</Text>
                        <Text fw={500}>{data.duration} days</Text>
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <Text size="xs" c="dimmed">Route</Text>
                        <Text fw={500}>{data.route}</Text>
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <Text size="xs" c="dimmed">Prescription ID</Text>
                        <Text fw={500}>{data.prescriptionId}</Text>
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <Text size="xs" c="dimmed">Medicine ID</Text>
                        <Text fw={500}>{data.medicineId ?? "N/A"}</Text>
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <Text size="xs" c="dimmed">Instructions</Text>
                        <Text fw={500}>{data.instructions}</Text>
                    </Grid.Col>

                </Grid>

            </Card>
                    ))}
            </div>
            {
                medicineData.length===0 && (
                    <Text color="dimmed" size="sm" mt="md">
                        No medicines prescribed for this appointment.
                    </Text>
                )
            }
        </Modal>
    </div>
  );
};

export default Prescriptions;
