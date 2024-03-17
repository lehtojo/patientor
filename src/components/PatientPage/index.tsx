import patientService from "../../services/patients";
import { Patient } from "../../types";
import React from "react";
import GenderIcon from "./GenderIcon";

export interface PatientViewProps {
    patient: Patient
}

export interface PatientPageProps {
    patientId: string
}

const PatientView = (props: PatientViewProps) => {
    return (
        <>
            <h2>
                {props.patient.name}
                <GenderIcon gender={props.patient.gender} />
            </h2>

            SSN: {props.patient.ssn || '-'} <br/>
            Occupation: {props.patient.occupation}
        </>
    );
};

const PatientPage = (props: PatientPageProps) => {
    const [patient, setPatient] = React.useState<Patient | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const fetchPatient = async () => {
            try {
                const patient = await patientService.getPatient(props.patientId);
                setPatient(patient);
            } catch {
                setPatient(null);
            }

            setLoading(false);
        };
        void fetchPatient();
    }, [props.patientId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!patient) {
        return <p>Failed to find the patient</p>;
    }

    return <PatientView patient={patient} />;
};

export default PatientPage;