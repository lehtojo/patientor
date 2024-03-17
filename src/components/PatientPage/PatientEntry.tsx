import { Box, Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../types";

export interface PatientEntryProps {
    entry: Entry,
    diagnoses: Diagnosis[]
}

export interface DiagnosisListEntryProps {
    diagnosis: Diagnosis
}

const DiagnosisListEntry = (props: DiagnosisListEntryProps) => {
    return (
        <li>
            <Typography>
                {props.diagnosis.code + ' '}
                <Box sx={{ fontStyle: 'italic', display: 'inline' }}>{props.diagnosis.name}</Box>
            </Typography>
        </li>
    );
};

const PatientEntry = (props: PatientEntryProps) => {
    const diagnoses = props.entry.diagnosisCodes
        ?.map((code) => props.diagnoses.find((diagnosis) => diagnosis.code === code))
        .filter((diagnosis) => !!diagnosis) as Diagnosis[];

    return (
        <>
            {props.entry.date} {props.entry.description} <br />

            <ul>
                {diagnoses && diagnoses.map((diagnosis) =>
                    <DiagnosisListEntry key={diagnosis.code} diagnosis={diagnosis} />
                )}
            </ul>
        </>
    );
};

export default PatientEntry;