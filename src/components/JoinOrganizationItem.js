import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import history from '../redux/history';
import { EditIcon } from '../assets/SvgComponents';
import colors from '../styles/colors';

export const styles = makeStyles(theme => ({
  linkContainer: {
    backgroundColor: colors.greyScale.info,
    borderRadius: '10px',
    padding: '25px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  editContainer: {
    display: 'flex',
    paddingRight: '20px'
  },
  editInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: '15px'
  },
  editLabel: {
    color: colors.secondary.peach,
    fontSize: '22px',
    lineHeight: '36px'
  },
  editText: {
    fontSize: '16px',
    lineHeight: '21px',
    color: colors.greyScale.darkest
  },
  iconContainer: {
    width: '48px',
    height: '51px',
    padding: '11px 0 0 14px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: colors.secondary.peach,
    borderRadius: '5px'
  },
  icon: {
    fontSize: '36px',
    cursor: 'pointer'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  buttonLabel: {
    color: colors.secondary.peach,
    paddingBottom: '16px'
  },
  button: {
    border: `1px solid ${colors.primary.accent}`,
    borderRadius: '8px',
    padding: '10px 29px',
    backgroundImage: colors.gradients.orange,
    color: colors.primary.white,
    textTransform: 'capitalize'
  }
}));

const JoinOrganizationItem = props => {
  const classes = styles();

  const redirectToOrganizations = () => {
    history.push('/my-organizations/wizard');
  };

  return (
    <div className={classes.linkContainer}>
      <div className={classes.editContainer}>
        <div className={classes.iconContainer}>
          <EditIcon  onClick={redirectToOrganizations} className={classes.icon} viewBox="0 0 24 24" fill={colors.primary.white} />
        </div>
        <div className={classes.editInfo}>
          <p className={classes.editLabel}>{props.legalName}</p>
          <p className={classes.editText}>
            Your organization is almost there, few more steps required to complete the process
          </p>
        </div>
      </div>
      <div className={classes.buttonContainer}>
        {/* <p className={classes.buttonLabel}>Will be deleted in 7 days</p> */}
        <Button className={classes.button} onClick={redirectToOrganizations}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default JoinOrganizationItem;
