import React from "react";

import { makeStyles,  } from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";

import CardsGridList from "../../../components/CardsGridList";
import OrgsGridItem from "../../../components/OrgsGridItem";
import AddSubOrgCard from "../../../components/AddSubOrgCard";

import colors from "../../../styles/colors";

const styles = makeStyles({
  subsWrapper: {
    width: '100%',
    backgroundColor: colors.greyScale.moreLighter,
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      backgroundColor: colors.primary.white,
    },
  },
  subsContent: {
    paddingTop: '60px',
    paddingBottom: '60px',
    ['@media (max-width:1069px)']: { // eslint-disable-line no-useless-computed-key
      paddingTop: '20px',
      paddingBottom: '20px',
    },
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      paddingTop: '0',
    },
  },
  subsTitle: {
    fontSize: '24px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
    marginBottom: '20px'
  },
});


function SubOrganizations(props) {
  const classes = styles();
  const {organization: {orgid, name}, subs, canManage} = props;
  console.log(`[IN SubOrganizations] ${JSON.stringify(props)}`);

  return (
    <div className={classes.subsWrapper}>
      <Container className={classes.subsContent}>
        <Typography variant={'h6'} className={classes.subsTitle}>
          Organizational Units ({subs.length})
        </Typography>
        <CardsGridList spacing={2}>
          {
            subs.map((subOrg, index) => {
              return (
                <Grid lg={3} sm={4} xs={12} item key={index.toString()}>
                  <OrgsGridItem canManage={canManage} organization={subOrg}/>
                </Grid>
              )
            })
          }
          {
            canManage && (
              <Grid item style={{width: '264px'}}>
                <AddSubOrgCard parent={{orgid, name}}/>
              </Grid>
            )
          }
        </CardsGridList>
      </Container>
    </div>
  )
}

export default SubOrganizations;
