import { Card, Title, Description } from "./styled.Main";

type MealCardProps = {
    type: "breakfast" | "lunch" | "dinner";
    menu: string;
    loading?: boolean;
};

const MealCard = ({ type, menu, loading }: MealCardProps) => {
    const mealTitle =
        type === "breakfast" ? "조식" : type === "lunch" ? "중식" : "석식";

    const mealText = `<오늘의 ${mealTitle}>\n\n${menu.replace(
        /\//g,
        "\n"
    )}\n\n급식 정보는? 밥.net`;
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${mealTitle} 메뉴`,
                    text: mealText,
                });
            } catch (error) {
                console.error("공유 실패:", error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(mealText);
                alert("급식 정보가 클립보드에 복사되었습니다! 🎉");
            } catch (error) {
                console.error("클립보드 복사 실패:", error);
                alert("클립보드 복사에 실패했습니다.");
            }
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
