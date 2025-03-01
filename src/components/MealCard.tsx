import { Card, Title, Description } from "./styled.Main";

type MealCardProps = {
    type: "breakfast" | "lunch" | "dinner";
    menu: string;
    loading?: boolean;
};

const MealCard = ({ type, menu, loading }: MealCardProps) => {
    const mealTitle =
        type === "breakfast" ? "조식" : type === "lunch" ? "중식" : "석식";

    return (
        <Card loading={loading}>
            {!loading && (
                <>
                    <Title>{mealTitle}</Title>
                    <Description>
                        {menu.split("/").map((item, index) => (
                            <span key={index}>
                                {item.trim()}
                                <br />
                            </span>
                        ))}
                    </Description>
                </>
            )}
        </Card>
    );
};

export default MealCard;
