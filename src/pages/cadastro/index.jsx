import { useNavigate  } from "react-router-dom";
import {MdOutlinePersonAdd, MdEmail, MdLock } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';


import { useForm } from "react-hook-form";


import  {DescritivoText, Logintext, JatenhoContaText, Container, Title, Column, TitleLogin, SubtitleLogin,  Row, Wrapper } from './styles';

const Cadastro = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try{
            const {data} = await api.post('/users',formData);
            
            if(data.id){
                navigate('/login') 
                return
            }

            alert('Usuário ou senha inválido')
        }catch(e){
            //TODO: HOUVE UM ERRO
            alert('Erro desconhecido')
        }
    };
    const navigateToLogin = () => {
        navigate('/login');
    };

    console.log('errors', errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleLogin>Comece Agora grátis</TitleLogin>
                <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="Nome Completo" leftIcon={<MdOutlinePersonAdd />} name="nomeCompleto"  control={control} />
                    {errors.nomeCompleto && <span>Nome completo é obrigatório</span>}
                    <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email"  control={control} />
                    {errors.email && <span>E-mail é obrigatório</span>}
                    <Input type="password" placeholder="Senha" leftIcon={<MdLock />}  name="senha" control={control} />
                    {errors.senha && <span>Senha é obrigatório</span>}
                    <Button title="Criar minha conta" variant="secondary" type="submit"/>
                </form>
                <Row>
                    <DescritivoText>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</DescritivoText>
               </Row>
                <Row>
                    <JatenhoContaText>Já tenho Conta.  <Logintext type='button' onClick={navigateToLogin}>Fazer Login. </Logintext> 
                    
                
                    </JatenhoContaText>
                    </Row>
                    
                </Wrapper>                
            </Column>
        </Container>
    </>)
}

export { Cadastro }