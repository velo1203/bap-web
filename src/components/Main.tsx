import { useEffect, useState } from "react";
import {
    CardSection,
    Container,
    Header,
    Menu,
    MenuSection,
} from "./styled.Main";
import axios from "axios";
import { format } from "date-fns/format";
import MealCard from "./MealCard";
import DaySelector from "./DaySelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import config from "../config.json";

type MealType = {
    breakfast: string;
    lunch: string;
    dinner: string;
    images: {
        breakfast: string;
        lunch: string;
        dinner: string;
    };
};

const errorComment = "급식을 불러올 수 없습니다";
const NoMenu = "메뉴 정보 없음";

function Main() {
    const [loading, setLoading] = useState(true);
    const [Meal, setMeal] = useState<MealType | null>(null);
    const [Day, setDay] = useState<Date>(new Date());
    const [error, setError] = useState(false);

    const handleDateChange = (newDate: Date) => {
        setDay(newDate);
    };

    useEffect(() => {
        const formattedDate = format(Day, "yyyy-MM-dd");
        console.log(`📅 API 호출: https://api.밥.net/${formattedDate}`);

        setLoading(true);
        setError(false);

        axios
            .get<MealType>(`https://api.밥.net/${formattedDate}`)
            .then((res) => {
                setMeal(res.data);
            })
            .catch((error) => {
                console.error("API 호출 오류:", error);
                setMeal(null);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [Day]);

    return (
        <Container>
            <Header>
                <h1>
                    디미고 <span>밥</span>
                </h1>
                <MenuSection>
                    <Menu
                        onClick={() => {
                            window.location.href = config.github;
                        }}
                    >
                        <FontAwesomeIcon icon={faGithub} />
                    </Menu>
                    <DaySelector onChange={handleDateChange} />
                    <Menu
                        onClick={() => {
                            window.location.href = config.insta;
                        }}
                    >
                        <FontAwesomeIcon icon={faInstagram} />
                    </Menu>
                </MenuSection>
            </Header>
            <CardSection>
                <MealCard
                    type="breakfast"
                    menu={
                        loading
                            ? ""
                            : error
                            ? errorComment
                            : Meal?.breakfast || NoMenu
                    }
                    loading={loading}
                />
                <MealCard
                    type="lunch"
                    menu={
                        loading
                            ? ""
                            : error
                            ? errorComment
                            : Meal?.lunch || NoMenu
                    }
                    loading={loading}
                />
                <MealCard
                    type="dinner"
                    menu={
                        loading
                            ? ""
                            : error
                            ? errorComment
                            : Meal?.dinner || NoMenu
                    }
                    loading={loading}
                />
            </CardSection>
        </Container>
    );
}

export default Main;
