import styled, { keyframes } from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-bottom: 30px;
`;

export const FormGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #efeeed;
  transition: border-color 0.3s, color 0.3s;
  color: #efeeed;

  &:focus {
    outline: none;
    border-bottom-color: #333333;
    color: #333333;
  }

  &.error {
    border-bottom-color: red;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #00c8b3;
  border-radius: 20px;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s, background-color 0.3s;

  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    background-color: #f6f6f6;
    color: #dddcdc;
    cursor: not-allowed;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 2px solid #aaaaaa;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: ${spin} 1s linear infinite;
`;

