import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    Container,
    Header,
    Menu,
    MenuSection,
    CardSection,
    MobileCarouselWrapper,
    Center,
} from "./styled.Main";
import axios, { AxiosError } from "axios";
import { format, addDays } from "date-fns";
import MealCard from "./MealCard";
import DaySelector from "./DaySelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import config from "../config.json";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const fetchMeal = async (date: string) => {
    try {
        const { data } = await axios.get<MealType>(
            `https://api.밥.net/${date}`
        );
        return data;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.status === 404) {
            throw new Error("404");
        }
        throw error;
    }
};

function Main() {
    const [Day, setDay] = useState<Date>(new Date());
    const [startIndex, setStartIndex] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
    useEffect(() => {
        // 서비스 워커 업데이트
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
                for (const registration of registrations) {
                    registration.update(); // 기존 서비스 워커 업데이트 요청
                }
            });

            navigator.serviceWorker.addEventListener("controllerchange", () => {
                console.log("새 버전이 감지됨, 페이지를 새로고침합니다.");
                window.location.reload(); // 새 버전 적용 후 자동 새로고침
            });
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const now = new Date();
        const hour = now.getHours();

        if (hour < 8) {
            setStartIndex(0);
            setDay(now);
        } else if (hour < 13) {
            setStartIndex(1);
            setDay(now);
        } else if (hour < 19) {
            setStartIndex(2);
            setDay(now);
        } else {
            setStartIndex(0);
            setDay(addDays(now, 1));
        }
    }, []);

    const formattedDate = format(Day, "yyyy-MM-dd");

    const {
        data: Meal,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["meal", formattedDate],
        queryFn: () => fetchMeal(formattedDate),
        staleTime: 1000 * 60 * 5,
        retry: (failureCount, err) => {
            if (err.message === "404") return false;
            return failureCount < 3;
        },
    });

    type MealType = "breakfast" | "lunch" | "dinner";

    const mealData = [
        { type: "breakfast" as MealType, menu: Meal?.breakfast || NoMenu },
        { type: "lunch" as MealType, menu: Meal?.lunch || NoMenu },
        { type: "dinner" as MealType, menu: Meal?.dinner || NoMenu },
    ];
    if (startIndex === null) return null; // startIndex가 설정되기 전까지 렌더링 방지

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        initialSlide: startIndex,
        arrows: false,
    };

    return (
        <Center>
            <Container>
                <Header>
                    <h1>밥.net</h1>

                    {isMobile ? (
                        <>
                            <MenuSection>
                                <DaySelector onChange={setDay} />
                            </MenuSection>
                            <MenuSection>
                                <Menu
                                    onClick={() =>
                                        (window.location.href = config.github)
                                    }
                                >
                                    <FontAwesomeIcon icon={faGithub} />
                                </Menu>

                                <Menu
                                    onClick={() =>
                                        (window.location.href = config.insta)
                                    }
                                >
                                    <FontAwesomeIcon icon={faInstagram} />
                                </Menu>
                            </MenuSection>
                        </>
                    ) : (
                        <>
                            <MenuSection>
                                <Menu
                                    onClick={() =>
                                        (window.location.href = config.github)
                                    }
                                >
                                    <FontAwesomeIcon icon={faGithub} />
                                </Menu>
                                <DaySelector onChange={setDay} />
                                <Menu
                                    onClick={() =>
                                        (window.location.href = config.insta)
                                    }
                                >
                                    <FontAwesomeIcon icon={faInstagram} />
                                </Menu>
                            </MenuSection>
                        </>
                    )}
                </Header>

                {isMobile ? (
                    <MobileCarouselWrapper>
                        <Slider {...sliderSettings}>
                            {mealData.map((meal, index) => (
                                <MealCard
                                    key={index}
                                    type={meal.type}
                                    menu={
                                        isLoading
                                            ? ""
                                            : isError
                                            ? errorComment
                                            : meal.menu
                                    }
                                    loading={isLoading}
                                />
                            ))}
                        </Slider>
                    </MobileCarouselWrapper>
                ) : (
                    <CardSection>
                        {mealData.map((meal, index) => (
                            <MealCard
                                key={index}
                                type={meal.type}
                                menu={
                                    isLoading
                                        ? ""
                                        : isError
                                        ? errorComment
                                        : meal.menu
                                }
                                loading={isLoading}
                            />
                        ))}
                    </CardSection>
                )}
            </Container>
        </Center>
    );
}

export default Main;
