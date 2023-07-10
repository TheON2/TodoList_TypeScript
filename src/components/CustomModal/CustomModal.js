import Modal from "react-modal";
import React, {useCallback, useEffect, useState} from "react";
import CustomButton from "../CustomButton/CustomButton";
import {useQuery} from "react-query";
import {getTodo} from "../../api/todos";
import {useDispatch, useSelector} from "react-redux";
import {falseModal, trueHaveNew, trueModal} from "../../redux/reducers/todosSlice";
import {Container, GlobalStyle, Linker} from "../../pages/Detail/style";
import ReadTodo from "../ReadTodo/ReadTodo";
import UpdateTodo from "../UpdateTodo/UpdateTodo";
import {StyledH4, StyledModal} from "./style";

const CustomModal = ({name, size, theme, border, type}) => {
  const dispatch=useDispatch()
  const [onUpdate,setOnUpdate]=useState(false)
  const { viewMode,modalOn,todo } = useSelector(state => state.todos);
  const onModal=useCallback(()=>{
    dispatch(trueModal())
  },[])
  const offModal=useCallback(()=>{
    dispatch(falseModal())
    setOnUpdate(false)
  },[])
  const toggleUpdate = useCallback(()=>{
    setOnUpdate(prev => !prev)
  },[])

  return (
    <>
      {type === 'type1' ?  (<>
        <StyledH4 onClick={onModal}>{name}</StyledH4>
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
                <UpdateTodo todo={todo} toggleUpdate={toggleUpdate}/>}
          </Container>
        </StyledModal></>):(<></>)}
    </>
  )
}
export default CustomModal