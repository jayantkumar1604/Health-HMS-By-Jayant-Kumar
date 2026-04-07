import React from 'react';
import {DataTable, DataTableFilterMeta} from "primereact/datatable";
import {IconSearch,IconTrash,IconEye} from '@tabler/icons-react';
import { Fieldset, TextInput, MultiSelect,Textarea ,Select,NumberInput,ActionIcon,Button} from '@mantine/core'
import {symptoms,tests,dosageFrequencies} from "../../../Data/DropdownData";
import {getReportsByPatientId,isReportExists,createAppointmentReport} from "../../../Service/AppointmentService"
import {useForm} from "@mantine/form";
import {errorNotification, successNotification} from '../../../Utility/NotificationUtil'
import { useDispatch } from "react-redux";
import {formatDate} from "../../../Utility/DateUtility";
import {useNavigate} from "react-router-dom";
import {useState,useEffect} from "react";
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';



const ApReport = ({appointment}:any) => {
    console.log("Appointment in Report:",appointment);
    const dispatch=useDispatch();
    const [data, setData] = useState<any[]>([]);
    const [allowAdd, setAllowAdd] = useState<boolean>(false);
    const [edit, setEdit] = useState(false);
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

    const navigate=useNavigate();
    const [loading, setLoading] = React.useState(false);
    type Medicine={
        name: string,
        medicineId?: string,
        dosage: string,
        frequency: string,
        duration: number,
        route: string,
        type: string,
        instructions: string,
        prescriptionId?: number;
    }

    const form = useForm({
        initialValues: {
            symptoms: [],
            tests: [],
            diagnosis: '',
            referral: '',
            notes: '',
            prescription: {
                medicines: [] as Medicine[]
            }
        },
        validate:{
            symptoms: (value:string[])=>(value.length>0?null: 'Please select at least one symptoms'),
            diagnosis: (value:string)=>(value?.trim()?null:'Diagnosis details are required'),
            prescription: {
                medicines: {
                    name: (value:string) => (value?.trim() ? null : 'Medicine name is required'),
                    dosage: (value:string) => (value?.trim() ? null : 'Dosage is required'),
                    frequency: (value:string) => (value?.trim() ? null : 'Frequency is required'),
                    duration: (value:number) => (value>0 ? null : 'Duration must be greater than 0'),

                    route: (value:string) => (value?.trim() ? null : 'Route is required'),
                    type: (value:string) => (value?.trim() ? null : 'Type is required'),
                    instructions: (value:string) => (value?.trim() ? null : 'Instructions is required')
                }
            }
        }
    })

    const insertMedicine =() => {
        form.insertListItem('prescription.medicines',{ name:'', dosage:'', frequency:'',duration: 0, route: '', type: '',instructions: ''});
    }

    const removeMedicine = (index: number) => {
        form.removeListItem('prescription.medicines', index);
    }

    useEffect(() => {
        fetchData();
    },[appointment?.patientId, appointment.id]);
    const fetchData = () => {
        if (!appointment?.patientId) return;

        getReportsByPatientId(appointment.patientId)
            .then((res) => {

                setData(res);
            })
            .catch((err) => {
                console.error("Error fetching reports:", err);
            });
        isReportExists(appointment.id).then((res)=>{
            setAllowAdd(!res);
            console.log("Report existence check:", res);
        }).catch((err)=>{
            console.error("Error checking report existence:", err);
            setAllowAdd(true);
        });

    }
    const handleSubmit = (values: typeof form.values)=>{
        console.log("Form Submitted with values:",values);
        let data={
            ...values,
            doctorId: appointment.doctorId,
            patientId: appointment.patientId,
            appointmentId: appointment.id,
            prescription:{
                ...values.prescription,
                doctorId: appointment.doctorId,
                patientId: appointment.patientId,
                appointmentId: appointment.id,
            }
        }
        console.log("Form Submitted with values:",data);
        setLoading(true);
        createAppointmentReport(data)
            .then((res:any)=>{
                successNotification("Report created successfully.");
                form.reset();
                setEdit(false);
                setAllowAdd(false);
                fetchData();
            })
            .catch((err:any)=>{
                errorNotification(err?.response?.data?.errorMessage || "Failed to create report")
            }).finally(()=>{
            setLoading(false);
        })
    }

    const actionBodyTemplate = (rowData:any) => {
        return <div className='flex gap-2'>
            {/*<ActionIcon onClick={() => navigate("/doctor/appointments/"+ rowData.appointmentId)}>*/}
            {/*    <IconEye size={20} stroke={1.5} />*/}
            {/*</ActionIcon>*/}

        </div>
    };
    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-between items-center">
                {allowAdd&& <Button variant="filled" onClick={()=>setEdit(true)}>Add Report</Button>}
                <TextInput leftSection={<IconSearch />} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </div>
        );
    };
    const header = renderHeader();

    return (
        <div>
            {!edit ?<DataTable stripedRows header={header} value={data} size='small' rows={10}
                       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                       rowsPerPageOptions={[10, 25, 50]} dataKey="id"
                       filters={filters} filterDisplay="menu" globalFilterFields={['doctorName', 'notes']}
                       emptyMessage="No appointment found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                <Column field="doctorName" header="Doctor" />
                <Column field="diagnosis" header="Diagnosis" />
                <Column field="reportDate" header="Report Date" sortable body={(rowData)=>formatDate(rowData.createdAt)} />
                <Column field="notes" header="Notes"   />
                <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
            </DataTable>


            :<form onSubmit={form.onSubmit(handleSubmit)} className="grid gap-5">
            <Fieldset className="grid gap-4 grid-cols-2" legend={<span className="text-lg font-medium text-primary-500">Personal Information</span>} radius="md">
                <MultiSelect {...form.getInputProps("symptoms")} className="col-span-2" withAsterisk
                             label="Symptoms"
                             placeholder="Pick symptoms"
                             data={symptoms}
                />

                <MultiSelect {...form.getInputProps("tests")} className="col-span-2"
                             label="Tests"
                             placeholder="Pick tests"
                             data={tests}
                />
                <TextInput {...form.getInputProps("diagnosis")} label="Diagnosis" placeholder="Enter diagnosis" withAsterisk />
                <TextInput {...form.getInputProps("referral")}  label="Referral" placeholder="Enter referral details" />
                <Textarea {...form.getInputProps("notes")}  className="col-span-2" label="Notes" placeholder="Enter any additional notes" />
            </Fieldset>

            <Fieldset className="grid gap-5" legend={<span className="text-lg font-medium text-primary-500">Prescription</span>} radius="md">
                {
                    form.values.prescription.medicines.map((_medicine: Medicine, index: number)=>
                        (<Fieldset legend={<div className="flex items-center gap-5">
                                <h1 className="text-lg font-medium" >Medicine {index+1}</h1>
                                <ActionIcon onClick={()=> removeMedicine(index)} variant="filled" color="red" size="md" className="mb-2">
                                    <IconTrash />
                                </ActionIcon></div>} className="grid gap-4 col-span-2 grid-cols-2">
                                <TextInput {...form.getInputProps(`prescription.medicines.${index}.name`)} label="Medicine" placeholder="Enter medicine name" withAsterisk />
                                <TextInput {...form.getInputProps(`prescription.medicines.${index}.dosage`)} label="Dosage" placeholder="Enter dosage" withAsterisk />
                                <Select {...form.getInputProps(`prescription.medicines.${index}.frequency`)}  label="Frequency" placeholder="Enter frequency" withAsterisk data={dosageFrequencies} />
                                <NumberInput {...form.getInputProps(`prescription.medicines.${index}.duration`)} label="Duration (days)" placeholder="Enter duration in days" withAsterisk />
                                <Select {...form.getInputProps(`prescription.medicines.${index}.route`)}  label="Route" placeholder="Select route" withAsterisk data={["Oral","Intravenous","Topical","Inhalation"]}/>
                                <Select {...form.getInputProps(`prescription.medicines.${index}.type`)}  label="Type" placeholder="Select type" withAsterisk data={["Tablet","Syrup","Injection","Capsule","Ointment"]}/>
                                <TextInput {...form.getInputProps(`prescription.medicines.${index}.instructions`)}  label="Instructions" placeholder="Enter instruction" withAsterisk />
                            </Fieldset>
                        ))
                }
                <div className="flex items-center col-span-2 justify-center">
                    <Button onClick={insertMedicine} variant="outline" color="blue" className="col-span-2">Add Medicine</Button>
                </div>
            </Fieldset>
            <div className="flex items-center gap-5 justify-center">
                <Button loading={loading} type="submit" className="w-full" variant="filled" color="blue">Submit Report</Button>
                <Button loading={loading} variant="filled" color="red">Cancel</Button>
            </div>
        </form>}
        </div>
    )
}
export default ApReport;