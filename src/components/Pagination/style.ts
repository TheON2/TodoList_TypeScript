import styled from 'styled-components';

export const MainColor = '#f0f0f0';
export const SecondaryColor = '#1d1f20';

export const Container = styled.div`
  display: flex;
  background: ${MainColor};
  margin: 0.25rem auto;
  border-radius: 0.2rem;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);
  counter-reset: pagination;
  text-align: center;
  &:after {
    clear: both;
    content: "";
    display: table;
  }
`;

export const PaginationUl = styled.ul`
  list-style: none;
  display: inline;
  padding-left: 0px;
`;

export const PaginationItem = styled.li`
  list-style: none;
  display: inline-block;
  padding-left: 0px;
  counter-increment: pagination;
  &:hover {
    a {
      color: ${MainColor};
      background-color: ${SecondaryColor};
      border: solid 1px ${SecondaryColor};
    }
  }
  &.active {
    a {
      color: ${MainColor};
      background-color: ${SecondaryColor};
      border: solid 1px ${SecondaryColor};
    }
  }
`;

export const PaginationLink = styled.a`
  border: solid 1px darken(${MainColor}, 10%);
  border-radius: 0.2rem;
  color: darken(${MainColor}, 45%);
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  padding: 0.5rem 0.9rem;
`;