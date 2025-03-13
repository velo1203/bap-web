import styled, { css, keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const glassmorphism = css`
    background: rgba(188, 188, 188, 0.15);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(6.4px);
    -webkit-backdrop-filter: blur(6.4px);
    border: 1.5px solid rgba(255, 255, 255, 0.5);
`;

export const Center = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    ${(props) => props.theme.media.mobile} {
        align-items: flex-start;
    }
`;

export const Container = styled.div`
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    ${(props) => props.theme.media.mobile} {
        flex-direction: column-reverse;
        gap: 8px;
    }
`;

export const Header = styled.header`
    width: 100%;
    padding: 15px;

    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    ${glassmorphism};

    h1 {
        font-size: ${(props) => props.theme.fontsize.large};

        margin-bottom: 15px;
    }

    ${(props) => props.theme.media.mobile} {
        padding: 20px;
        margin-top: 5px;
        h1 {
            font-size: ${(props) => props.theme.mobileFontSize.medium};
            margin-bottom: 16px;
        }
    }
`;

export const MenuSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;

    ${(props) => props.theme.media.mobile} {
        flex-direction: row;
    }
`;

export const Menu = styled.div`
    width: 15%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;

    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: rgba(0, 0, 0, 0.08);
    }
    ${(props) => props.theme.media.mobile} {
        display: none;
    }
    border: 1.5px solid rgba(255, 255, 255, 0.5);
    border-radius: 8px;
`;

export const CardSection = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 10px;
    margin-top: 10px;
    justify-items: center;
`;

export const Card = styled.div<{ loading?: boolean }>`
    width: 100%;
    padding: 20px;
    ${glassmorphism};
    cursor: pointer;
    text-align: left;
    transition: all 0.15s ease-in-out;
    min-height: 550px;

    ${(props) =>
        props.loading &&
        css`
            background: linear-gradient(
                90deg,
                rgba(68, 68, 68, 0.1) 25%,
                rgba(183, 183, 183, 0.2) 50%,
                rgba(68, 68, 68, 0.1) 75%
            );
            background-size: 200% 100%;
            animation: ${shimmer} 1.5s infinite linear;
        `};

    &:hover {
        background-color: rgba(0, 0, 0, 0.08);
    }
`;

export const Title = styled.h2`
    font-size: ${(props) => props.theme.fontsize.medium};
    color: ${(props) => props.theme.colors.primary};
    margin-bottom: 10px;
`;

export const Description = styled.p`
    font-size: ${(props) => props.theme.fontsize.small};
    color: ${(props) => props.theme.colors.text};
`;

export const MobileCarouselWrapper = styled.div`
    width: 100%;
    margin-top: 8px;
    @media (min-width: 768px) {
        display: none;
    }
    .slick-dots {
        bottom: -25px;
    }
`;

export const SelectorContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;

    ${(props) => props.theme.media.mobile} {
        border-radius: 16px;
        background: rgba(188, 188, 188, 0.15);
        backdrop-filter: blur(6.4px);
        -webkit-backdrop-filter: blur(6.4px);
    }

    border: 1.5px solid rgba(255, 255, 255, 0.5);
    border-radius: 8px;
`;

export const SelectorBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 1.2rem;
    height: 70px;
    user-select: none;
    ${(props) => props.theme.media.mobile} {
    }
`;

export const ArrowButton = styled.button`
    background: none;
    border: none;
    font-size: 1.5rem;
    width: 50px;
    height: 50px;
    cursor: pointer;
    color: ${(props) => props.theme.colors.primary};
    transition: all 0.1s ease-in-out;
    border-radius: 5px;
    &:hover {
        background-color: rgba(0, 0, 0, 0.08);
    }
    ${(props) => props.theme.media.mobile} {
        width: 40px;
        height: 40px;
        font-size: 1.2rem;
    }
`;

export const DateDisplay = styled.div`
    font-weight: bold;
    padding: 10px 30px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.1s ease-in-out;
    ${(props) => props.theme.media.mobile} {
        padding: 5px 5px;
        font-size: 0.9rem;
    }
`;
