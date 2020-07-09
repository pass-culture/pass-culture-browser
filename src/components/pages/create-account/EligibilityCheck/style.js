import { css } from '@emotion/core'
import colors from '../../../../styles/variables/colors'

const style = {
  page: {
    backgroundImage: "url('/id-check-bg.jpg')",
    backgroundSize: '100%',
    display: 'grid',
    gridTemplateColumns: '52px auto',
    gridTemplateRows: '80px auto',
    height: '100%',
  },

  form: css`
    align-items: center;
    background-color: ${colors.white};
    border-radius: 12px 12px 0 0;
    display: flex;
    flex: 7;
    flex-direction: column;
    grid-column: 1/3;
    grid-row: 2/3;
    height: 100%;
    justify-content: space-between;
    padding: 24px 0;
    position: relative;
  `,

  label: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  },

  title: css`
    grid-row: 1/2;
    grid-column: 1/3;
    place-self: center;
    color: ${colors.white};
    font-size: 18px;
   `,

  input: {
    border:`1px solid ${colors.greyMedium}`,
    borderRadius:'24px',
    fontSize:'22px',
    fontWeight:'500',
    margin:'16px 0',
    outline:'none',
    padding:'11px 0',
    textAlign:'center',

    '&::placeholder': {
      color: colors.greyMedium,
    },

    '&:focus': {
      border:'2px solid #EB0055',
      caretColor: colors.primary,
      margin: '15px 0',
    }
  },

  submitInput: css`
    background-image: linear-gradient(101deg, ${colors.primary} -42%, ${colors.secondary} 128%);
    border: none;
    border-radius: 24px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.25);
    color: ${colors.white};
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    outline: none;
    padding: 15px 0;
    width: 300px;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
      -webkit-text-fill-color: ${colors.white};
    }
  ` ,
}

export default style
