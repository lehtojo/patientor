import TripOriginIcon from '@mui/icons-material/TripOrigin';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Gender } from "../../types";

export interface GenderIconProps {
    gender: string
}

const GenderIcon = (props: GenderIconProps) => {
    switch (props.gender) {
        case Gender.Female:
            return <FemaleIcon />;
        case Gender.Male:
            return <MaleIcon />;
        case Gender.Other:
            return <TripOriginIcon />;
    }
};

export default GenderIcon;