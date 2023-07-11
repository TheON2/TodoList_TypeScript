import React, {useCallback, useState} from "react";
import CustomButton from "../CustomButton/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {TodosState, falseModal} from "../../redux/reducers/todosSlice";
import ReadTodo from "../ReadTodo/ReadTodo";
import UpdateTodo from "../UpdateTodo/UpdateTodo";
import { Container, GlobalStyle, Linker, StyledModal} from "./style";
import { RootState } from './../../type/local';

interface CustomModalProps {
  type?:string;
}

const CustomModal = ({type}:CustomModalProps) => {
  const dispatch=useDispatch()
  const [onUpdate,setOnUpdate]=useState(false)
  const { modalOn,todo }:{modalOn:boolean,todo:TodosState["todo"]} = useSelector((state:RootState) => state.todos);

  const offModal=useCallback(()=>{
    dispatch(falseModal())
    setOnUpdate(false)
  },[dispatch,setOnUpdate])
  const toggleUpdate = useCallback(()=>{
    setOnUpdate(prev => !prev)
  },[])

  return (
    <>
      {type === 'type1' ?  (<>
        <StyledModal
          isOpen={modalOn}
          shouldCloseOnOverlayClick={false}
          onRequestClose={offModal}
          size={'a'}
          style={{
            overlay: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            content:{
              position: 'relative',
              width: '50%',
              height: '50%',
            },
          }}
        >
          <GlobalStyle/>
          <Container>
              <Linker href='/'>
                <CustomButton theme={'type1'} size={'medium'}>이전으로</CustomButton>
              </Linker>
              { !onUpdate ?
                <ReadTodo todo={todo} toggleUpdate={toggleUpdate}/>:
                <UpdateTodo toggleUpdate={toggleUpdate}/>}
          </Container>
        </StyledModal></>):(<></>)}
    </>
  )
}
export default CustomModal