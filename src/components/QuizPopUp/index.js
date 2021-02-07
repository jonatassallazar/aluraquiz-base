import styled from 'styled-components';

const QuizPopUp = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.mainBg};
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

QuizPopUp.Center = styled.div`
  width: 250px;
  height: 250px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.colors.mainBg} 2px 2px 14px;
`;

QuizPopUp.P = styled.h5`
  font-size: 26px;
  color: #484848;
  margin: 14px auto;
`;

QuizPopUp.Img = styled.img`
  width: 100px;
  height: 100px;
`;

export { QuizPopUp as default };
