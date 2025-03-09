import styled, { css, keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

export const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

export const Header = styled.header`
    width: 100%;
    padding: 35px;
    margin-top: 50px;
    text-align: center;
    display: flex;
    flex-direction: column;

    justify-content: center;
    background-color: ${(props) => props.theme.colors.uiBackground};
    h1 {
        font-size: ${(props) => props.theme.fontsize.large};
        color: ${(props) => props.theme.colors.dimigo};
    }

    ${(props) => props.theme.media.mobile} {
        padding: 20px;
        margin-top: 20px;

        h1 {
            font-size: ${(props) =>
                props.theme.mobileFontSize.medium}; /* 모바일에서 크기 조정 */
        }
    }
`;

export const MenuSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 30px;
    ${(props) => props.theme.media.mobile} {
        flex-direction: row;
        gap: 10px;
        margin-top: 15px;
    }
`;

export const Menu = styled.div`
    width: 120px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    background: ${(props) => props.theme.colors.uiBackground};
    border-radius: 5px;
    box-shadow: inset 0 0 0 2px ${(props) => props.theme.colors.border}; /* 연한 테두리 */
    transition: all 0.1s ease-in-out;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.colors.background};
    }
    ${(props) => props.theme.media.mobile} {
        width: 60px;
        height: 50px;
        font-size: 20px;
    }
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
    background: ${(props) => props.theme.colors.uiBackground};
    border-radius: 5px;

    text-align: left;
    transition: all 0.1s ease-in;
    min-height: 500px;
    ${(props) =>
        props.loading &&
        css`
            background: linear-gradient(
                90deg,
                #f8f9fa 25%,
                rgb(241, 241, 241) 50%,
                #f8f9fa 75%
            );
            background-size: 200% 100%;
            animation: ${shimmer} 1.5s infinite linear;
        `};
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
