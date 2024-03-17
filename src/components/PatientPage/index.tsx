import diagnosisService from "../../services/diagnoses";
import patientService from "../../services/patients";
import { Diagnosis, Patient } from "../../types";
import PatientEntry from "./PatientEntry";
import GenderIcon from "./GenderIcon";
import React from "react";

export interface PatientViewProps {
    patient: Patient,
    diagnoses: Diagnosis[]
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

            <h3>Entries</h3>

            {props.patient.entries.map((entry) =>
                <PatientEntry key={entry.id} entry={entry} diagnoses={props.diagnoses} />
            )}
        </>
    );
};

const PatientPage = (props: PatientPageProps) => {
    const [patient, setPatient] = React.useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = React.useState<Diagnosis[]>([]);

    React.useEffect(() => {
        const fetchPatient = async () => {
            try {
                const patient = await patientService.getPatient(props.patientId);
                setPatient(patient);
            } catch {
                setPatient(null);
            }
        };

        const fetchDiagnoses = async () => {
            try {
                const diagnoses = await diagnosisService.getAll();
                setDiagnoses(diagnoses);
            } catch {
                setDiagnoses([]);
            }
        };

        void fetchPatient();
        void fetchDiagnoses();
    }, [props.patientId]);

    if (!patient || !diagnoses) {
        return <p>Loading...</p>;
    }

    return <PatientView patient={patient} diagnoses={diagnoses}/>;
};

export default PatientPage;