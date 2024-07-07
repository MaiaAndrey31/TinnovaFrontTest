import  { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormContainer, FormGroup, Input, ErrorMessage, SubmitButton, Loader } from './styles';

const schema = yup.object().shape({
  fullName: yup.string().min(3, 'Nome deve ter pelo menos 3 caracteres').required('Nome é obrigatório'),
  phone: yup.string().matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido').required('Telefone é obrigatório'),
  cpf: yup.string().test('cpf', 'CPF inválido', (value) => validateCPF(value)).required('CPF é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório')
});

const validateCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
  let check1 = 11 - (sum % 11);
  if (check1 === 10 || check1 === 11) check1 = 0;
  if (check1 !== parseInt(cpf.charAt(9))) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
  let check2 = 11 - (sum % 11);
  if (check2 === 10 || check2 === 11) check2 = 0;
  if (check2 !== parseInt(cpf.charAt(10))) return false;
  return true;
};

const ClientForm = () => {
  const { control, handleSubmit, formState: { errors, isValid, isDirty } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate an API call
    setLoading(false);
  };

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 3) return phoneNumber;
    if (phoneNumberLength < 8) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    }
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  const formatCPF = (value) => {
    if (!value) return value;
    const cpf = value.replace(/[^\d]/g, '');
    const cpfLength = cpf.length;
    if (cpfLength < 4) return cpf;
    if (cpfLength < 7) {
      return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}`;
    }
    if (cpfLength < 10) {
      return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}`;
    }
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <label>Nome Completo</label>
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              className={`input ${errors.fullName ? 'error' : ''}`}
              placeholder="Nome Completo"
            />
          )}
        />
        {errors.fullName && <ErrorMessage>{errors.fullName.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <label>Telefone</label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              className={`input ${errors.phone ? 'error' : ''}`}
              placeholder="Telefone"
              value={field.value}
              onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
            />
          )}
        />
        {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <label>CPF</label>
        <Controller
          name="cpf"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              className={`input ${errors.cpf ? 'error' : ''}`}
              placeholder="CPF"
              value={field.value}
              onChange={(e) => field.onChange(formatCPF(e.target.value))}
            />
          )}
        />
        {errors.cpf && <ErrorMessage>{errors.cpf.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <label>Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              className={`input ${errors.email ? 'error' : ''}`}
              placeholder="Email"
            />
          )}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </FormGroup>

      <SubmitButton type="submit" disabled={!isValid || !isDirty}>
        {loading ? <Loader /> : 'Cadastrar'}
      </SubmitButton>
    </FormContainer>
  );
};

export default ClientForm;
