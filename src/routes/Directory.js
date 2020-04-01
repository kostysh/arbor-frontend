import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  fetchSearchOrganizationsByType,
  fetchSearchOrganizations,
  isFetchedSelector,
  itemsSelector,
  metaSelector
} from '../ducks/fetchSearchResults';

import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import OrgsGridItem from '../components/OrgsGridItem';
import CardsGridList from '../components/CardsGridList';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '../components/Pagination';
import colors from '../styles/colors';
import history from '../redux/history';
import ArrowLeftIcon from '../assets/SvgComponents/ArrowLeftIcon';
import { countries } from '../utils/countries';
import _ from 'lodash';

const styles = makeStyles({
  screenHeader: {
    padding: '60px 0 20px 0',
    ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
      paddingTop: '88px',
    },
  },
  buttonWrapper: {
    marginLeft: '-7px'
  },
  buttonLabel: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1,
    textTransform: 'none',
    color: colors.primary.black
  },
  backButtonIcon: {
    width: '13px',
    height: '12px',
    verticalAlign: 'bottom',
    color: colors.primary.black,
    marginRight: '11px'
  },
  headingWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      flexWrap: 'wrap',
    },
  },
  directoryTitle: {
    fontSize: '32px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
  },
  gridListWrapper: {
    paddingTop: '30px'
  },
  filterWrapper: {
    width: '30%',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%'
    },
  },
  selectControl: {
    width: '100%',
    '& > .MuiInputBase-root': {
      padding: '0'
    },
    '& > .MuiInputLabel-formControl': {
      transform: 'translate(0, 24px) scale(1)'
    },
    '& > .MuiInputLabel-shrink': {
      transform: 'translate(0, 4px) scale(0.75)'
    }
  },
  paginationInfoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '40px 0'
  },
  totalSearchTitleContainer: {
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      display: 'none'
    },
  },
  totalSearchResultsTitle: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.42,
    color: colors.greyScale.dark,
    textTransform: 'capitalize'
  },
});

function Directory(props) {
  const classes = styles();
  const { items, meta: { per_page, total, pages} }  = props;
  const [forcePage, setForcePage] = useState(undefined);
  const [countryFilterValue, setCountryFilterValue] = useState('');
  const currentDirectory = props.match.params.directory;

  const data = {
    directory: currentDirectory,
    page: 1,
    per_page: per_page
  };

  useEffect(() => {
    props.fetchSearchOrganizations(data);
  }, [currentDirectory]); // eslint-disable-line react-hooks/exhaustive-deps

  const CardsList = () => {
    let OrgCards = items.map((item, index) => {
      return (
        <Grid lg={3} sm={4} xs={12} item key={index.toString()}>
          <OrgsGridItem organization={item}/>
        </Grid>
      )
    });

    return (
      <CardsGridList spacing={3} justify="flex-start" alignItems="flex-start">{OrgCards}</CardsGridList>
    )
  };

  const handlePageClick = data => {
    let selected = data.selected;
    const searchData = {
      directory: currentDirectory,
      page: selected + 1,
      per_page: 12
    };

    props.fetchSearchOrganizations(searchData)
  };

  //handle select fields
  const options = {
    countries
  };

  const handleCountryFilterValueChange = async e => {
    const data = {
      directory: currentDirectory,
      country: e.target.value,
      page: 1,
      per_page: per_page
    };
    await props.fetchSearchOrganizations(data);
    setForcePage(0);

    setCountryFilterValue(data.country);
  };

  const directoryTitle = () => {
    if(currentDirectory === 'ota') {
      return 'Travel agencies'
    } else if(currentDirectory === 'insurance') {
      return 'Insurance companies'
    } else {
      return `${currentDirectory.charAt(0).toUpperCase() + currentDirectory.slice(1)}s`;
    }
  };

  return (
    <div>
      <Container>
        <div className={classes.screenHeader}>
          <div className={classes.buttonWrapper}>
            <Button onClick={() => history.push('/directories')}>
              <Typography variant={'caption'} className={classes.buttonLabel}>
                <ArrowLeftIcon viewBox={'0 0 13 12'} className={classes.backButtonIcon}/>
                Back to directories
              </Typography>
            </Button>
          </div>
        </div>
        <div className={classes.headingWrapper}>
          <div className={classes.titleWrapper}>
            <Typography variant={'h2'} className={classes.directoryTitle}>
              {directoryTitle()}
            </Typography>
          </div>
          <div className={classes.filterWrapper}>
            <FormControl className={classes.selectControl}>
              <InputLabel>Country</InputLabel>
              <Select
                value={countryFilterValue}
                onChange={handleCountryFilterValueChange}
              >
                <MenuItem value={''}>All</MenuItem>
                {
                  _.map(options.countries, ((name, value) => (
                    <MenuItem key={name} value={value}>{name}</MenuItem>)
                  ))
                }
              </Select>
            </FormControl>
          </div>
        </div>
      </Container>
      <Container>
        <div className={classes.gridListWrapper}>
          <CardsList />
          {
            total > per_page ? (
              <div className={classes.paginationInfoContainer}>
                <div className={classes.totalSearchTitleContainer}>
                  <Typography variant={'caption'} className={classes.totalSearchResultsTitle}>ORG.ID in {props.match.params.directory + 's'}: {total}</Typography>
                </div>
                <div>
                  <Pagination
                    pageCount={pages}
                    onPageChange={handlePageClick}
                    forcePage={forcePage}
                  />
                </div>
              </div>
            ) : null
          }
        </div>
      </Container>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    items: itemsSelector(state),
    meta: metaSelector(state),
    isFetched: isFetchedSelector(state)
  }
};

const mapDispatchToProps = {
  fetchSearchOrganizationsByType,
  fetchSearchOrganizations
};

export default connect( mapStateToProps, mapDispatchToProps)(Directory);
