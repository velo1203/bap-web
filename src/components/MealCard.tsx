import { Card, Title, Description } from "./styled.Main";

type MealCardProps = {
    type: "breakfast" | "lunch" | "dinner";
    menu: string;
    loading?: boolean;
};

const MealCard = ({ type, menu, loading }: MealCardProps) => {
    const mealTitle =
        type === "breakfast" ? "조식" : type === "lunch" ? "중식" : "석식";
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${mealTitle} 메뉴`,
                    text: `<오늘의 ${mealTitle}> \n\n${menu.replace(
                        /\//g,
                        "\n"
                    )}\n\n급식 정보는? 밥.net`,
                });
            } catch (error) {
                console.error("공유 실패:", error);
            }
        } else {
            alert("이 브라우저에서는 공유 기능을 지원하지 않습니다.");
        }
    };
    return (
        <Card
            loading={loading}
            onClick={() => {
                handleShare();
            }}
        >
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
