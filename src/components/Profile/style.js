import styled from 'styled-components';

export const ProfileContainer = styled.div`
  text-align: center;
`;

export const AddButton = styled.a`
  .icon {
    float: right;
    line-height: 18px;
    width: 23px;
    border: 2px solid;
    border-radius: 100%;
    font-size: 18px;
    text-align: center;
    margin: 10px;
  }
  .icon:hover {
    color: #e64c65;
    border-color: #e64c65;
  }
`;

export const ProfilePicture = styled.div`
  margin-top: 60px;
  img {
    border: steelblue 5px solid;
    border-radius: 100%;
    width: 200px;
    height: 200px;
    margin: 0 auto;
    object-fit: cover;
  }
`;

export const UserName = styled.h1`
  margin: 25px 0 16px;
  text-align: center;
`;

export const ProfileDescription = styled.div`
  width: 210px;
  margin: 0 auto;
  text-align: center;
  p {
    color: ${props => props.theme.scndFontColor};
  }
`;

export const ProfileOptions = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  li {
    border-left: 1px solid #1f253d;
    float: left;
  }
  p {
    margin: 0;
  }
  a {
    display: block;
    width: 99px;
    line-height: 60px;
    text-align: center;
    -webkit-transition: background .3s;
    transition: background .3s;
    &:hover {
      text-decoration: none;
      background: #50597b;
    }
  }
  .comments {
    border-top: 4px solid #fcb150;
    &:hover .icon {
      color: #fcb150;
    }
  }
  .views {
    border-top: 4px solid #11a8ab;
    &:hover .icon {
      color: #11a8ab;
    }
  }
  .likes {
    border-top: 4px solid #e64c65;
    &:hover .icon {
      color: #e64c65;
    }
  }
  .icon {
    padding-right: 10px;
    font-size: 25px;
  }
`;