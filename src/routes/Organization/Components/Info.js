import React, {useState} from "react";
import {Button, Collapse, Container, Fade, Grid, Hidden, Typography} from "@material-ui/core";
import CopyIdComponent from "../../../components/CopyIdComponent";
import {setRandomDefaultImage} from "../../../utils/helpers";

import colors from "../../../styles/colors";
import {
  TwitterIcon,
  FacebookIcon,
  LinkedInIcon,
  GitHubIcon,
  TrustLevelIcon,
  EntityTrustLevelIcon,
  TelegramSocialIcon,
  MediumSocialIcon,
  InstagramSocialIcon,
  DetailsIllustration,
  MaximizeIcon,
  MinimizeIcon
} from '../../../assets/SvgComponents';

import _ from "lodash";
import {makeStyles} from "@material-ui/core/styles";

const styles = makeStyles({
  itemMainInfo: {
    position: 'relative',
    paddingBottom: '58px'
  },
  itemTrustInfoTitle: {
    fontSize: '14px',
    fontWeight: 400,
  },
  iconTrustLevel: {
    width: '13px',
    height: '16px',
    color: colors.secondary.yellow,
    margin: '0 4px 0 14px'
  },
  trustLevelValue: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 1,
    color: colors.primary.black
  },
  stageIcon: {
    width: '20px',
    height: '20px',
    marginRight: '12px'
  },
  orgMainInfoWrapper: {
    padding: '10px 0',
    flexWrap: 'nowrap',
    ['@media (max-width:1069px)']: { // eslint-disable-line no-useless-computed-key
      flexWrap: 'wrap'
    },
  },
  orgImageContainer: {
    width: '44%',
    ['@media (max-width:1069px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%'
    },
  },
  orgInfoContainer: {
    width: '56%',
    ['@media (max-width:1069px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
      marginTop: '20px',
    },
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      marginTop: '10px',
    },
  },
  orgImageWrapper: {
    position: 'relative',
    width: '450px',
    height: '200px',
    overflow: 'hidden',
    borderRadius: '4px',
    ['@media (max-width:1069px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
      height: '290px'
    },
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      height: '180px'
    },
  },
  orgImage: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
  },
  idInfoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      flexWrap: 'wrap',
    },
  },
  publicTrustLevelWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    ['@media (max-width:1069px)']: { // eslint-disable-line no-useless-computed-key
      display: 'none'
    },
  },
  orgNameWrapper: {
    width: '100%',
    marginTop: '7px'
  },
  orgName: {
    fontSize: '24px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
  },
  orgAddressWrapper: {
    margin: '24px 0 23px 0',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      margin: '20px 0'
    },
  },
  orgAddress: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.5,
    color: colors.greyScale.dark,
  },
  mapLink: {
    fontWeight: 500,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    color: colors.secondary.cyan
  },
  orgInfoFieldsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  orgInfoFieldWrapper: {
    width: '50%',
    margin: '5px 0',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
      margin: '6px 0'
    },
  },
  orgInfoLegalEntityFieldWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    ['@media (max-width:1069px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
    },
  },
  orgInfoFieldTitle: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1.3,
    color: colors.greyScale.dark,
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      color: colors.greyScale.darkest,
    },
  },
  orgInfoField: {
    textDecoration: 'none',
    fontWeight: 400,
    color: colors.greyScale.common
  },
  entityInfoItem: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '10%'
  },
  entityIcon: {
    width: '10px',
    height: '12px',
    color: colors.greyScale.common,
    marginRight: '4px'
  },
  entityValue: {
    color: colors.greyScale.darkest,
    fontSize: '12px',
    lineHeight: 1.2
  },
  socialInline: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '42px',
    ['@media (max-width:1069px)']: { // eslint-disable-line no-useless-computed-key
      marginTop: '0',
    },
  },
  socialLink: {
    textDecoration: 'none',
    textTransform: 'capitalize',
    marginRight: '29px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    '&:last-child': {
      marginRight: '0'
    },
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      marginRight: '18px',
    }
  },
  socialTitle: {
    fontSize: '16px',
    lineHeight: 1.03,
    fontWeight: 500,
    color: colors.greyScale.darkest,
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      display: 'none',
    }
  },
  mobileSocialWrapper: {
    position: 'relative',
  },
  mobileIconVerify: {
    position: 'absolute',
    bottom: '-4px',
    right: '-4px',
    width: '18px',
    height: '20px',
    zIndex: 2,
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      display: 'block !important',
      marginLeft: '0'
    }
  },
  socialIcon: {
    fontSize: 'large',
    marginRight: '10px',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: '3em',
      marginRight: '0',
    }
  },
  iconFacebook: {
    color: colors.social.facebook,
  },
  iconVerify: {
    margin: '0 0 0 8px',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      display: 'none',
    }
  },
  iconTelegram: {
    width: '18px',
    height: '15px',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      width: '36px',
      height: '36px',
    }
  },
  iconTwitter: {
    color: colors.social.twitter,
    '& + svg': {
      ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
        bottom: '2px'
      }
    }
  },
  iconMedium: {
    width: '17px',
    height: '14px',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      width: '36px',
      height: '36px',
    }
  },
  iconInstagram: {
    width: '17px',
    height: '17px',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      width: '36px',
      height: '36px',
    }
  },
  iconGitHub: {
    color: colors.primary.black
  },
  iconLinkedin: {
    color: colors.social.linkedin,
  },
  toggleOpenDetailsButtonContainer: {
    position: 'absolute',
    right: '0',
    bottom: '14px',
  },
  hideDetailsButtonWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px'
  },
  toggleOpenDetailsButton: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: 1.03,
    color: colors.secondary.peach,
    textTransform: 'none',
  },
  iconToggleDetailsOpen: {
    width: '20px',
    height: '20px',
    marginLeft: '14px',
    verticalAlign: 'middle'
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: colors.secondary.yellowLight,
    marginTop: '20px',
    ['@media (max-width:1069px)']: { // eslint-disable-line no-useless-computed-key
      marginTop: '0',
    },
  },
  detailsContent: {
    position: 'relative',
    paddingTop: '100px',
    paddingBottom: '100px',
    overflow: 'hidden',
    ['@media (max-width:1069px)']: { // eslint-disable-line no-useless-computed-key
      paddingTop: '40px',
      paddingBottom: '40px',
    },
  },
  detailsGrid: {
    ['@media (max-width:1069px)']: { // eslint-disable-line no-useless-computed-key
      flexDirection: 'column-reverse'
    },
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      padding: '0 15px'
    }
  },
  detailsIllustrationWrapper: {
    textAlign: 'center'
  },
  detailsIllustration: {
    width: '100%',
    maxWidth: '360px'
  },
  details: {
    fontSize: '16px',
    lineHeight: 1.7,
    fontWeight: 400,
    color: colors.greyScale.dark,
  },
  detailsCanManage: {
    paddingBottom: '40px'
  },
  detailsTitle: {
    fontSize: '24px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
    marginBottom: '20px',
    display: 'block',
  },
  line: {
    position: 'relative',
    top: '-2px',
    width: '20%',
    height: '4px',
    background: 'linear-gradient(88.72deg, #EC6F95 0.94%, #FCB871 100%)',
  },
  buttonWrapper: {
    width: '100%',
    margin: '20px 0'
  },
  button: {
    width: '100%',
    position: 'relative',
    fontSize: '16px',
    fontWeight: 500,
    color: colors.secondary.cyan,
    textTransform: 'none',
    boxShadow: '0px 0px 20px rgba(189, 191, 203, 0.25), 0px 0px 2px rgba(188, 194, 211, 0.25)',
    backgroundColor: colors.primary.white,
    borderRadius: '8px',
    padding: '20px 0'
  }
});

const getAddressString = (addressObj) => {
  const { country, subdivision, locality, streetAddress, premise, postalCode } = addressObj;
  return _.isEmpty(addressObj) ? false : _.compact([streetAddress, premise, postalCode,  locality, subdivision,country]).join(', ')
};

function Info(props) {
  const classes = styles();
  const [isOpen, toggleOpen] = useState(false);
  const {organization, canManage} = props;
  const { orgid: id, proofsQty, logo, name, parent, isWebsiteProved, directory } = organization;

  const isSub = !!parent;
  const type = isSub ? 'organizationalUnit' : 'legalEntity';
  const address = _.get(organization, `jsonContent.${type}.${type === 'legalEntity' ? 'registeredAddress' : 'address'}`, {});
  const addressString = _.isEmpty(address) ? false : getAddressString(address);
  const contacts = _.get(organization, `jsonContent.${type}.contacts[0]`, {});
  const description = _.get(organization, `jsonContent.organizationalUnit.description`, null);
  const longDescription = _.get(organization, `jsonContent.organizationalUnit.longDescription`, null);
  const entityName = _.get(organization, `parent.name`, '');
  const entityTrustLevel = _.get(organization, `parent.proofsQty`, 0);
  const socials = [];
  const possibleSocial = {
    'facebook': 'FB',
    'telegram': 'TG',
    'twitter': 'TW',
    'instagram': 'IG',
    'linkedin': 'LN'
  };
  _.each(possibleSocial, (short, name) => {
    if (contacts[name]) socials.push({
      network: name,
      link: contacts[name],
      verified: !!organization[`isSocial${short}Proved`]
    })
  });

  //check if website valid
  const website = () => {
    let reg = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;
    return reg.test(contacts.website) ? contacts.website : `http://${contacts.website}`
  };

  const icon = (socialNetwork) => {
    switch (socialNetwork) {
      case 'twitter':
        return <TwitterIcon className={[classes.socialIcon, classes.iconTwitter].join(' ')}/>;
      case 'facebook':
        return <FacebookIcon className={[classes.socialIcon, classes.iconFacebook].join(' ')}/>;
      case 'telegram':
        return <TelegramSocialIcon className={[classes.socialIcon, classes.iconTelegram].join(' ')}/>;
      case 'medium':
        return <MediumSocialIcon className={[classes.socialIcon, classes.iconMedium].join(' ')}/>;
      case 'instagram':
        return <InstagramSocialIcon className={[classes.socialIcon, classes.iconInstagram].join(' ')}/>;
      case 'github':
        return <GitHubIcon className={[classes.socialIcon, classes.iconGitHub].join(' ')}/>;
      case 'linkedin':
        return <LinkedInIcon className={[classes.socialIcon, classes.iconLinkedin].join(' ')}/>;
      default:
        return null;
    }
  };

  const addCanManageClass = (classNameBase, classNameCanManage) => {
    if (canManage) return `${classNameBase} ${classNameCanManage}`;
    return classNameBase;
  };

  return (
    <div>
      <Container className={classes.itemMainInfo}>
        <Grid container className={classes.orgMainInfoWrapper}>

          {/* TOP-LEFT-BLOCK: IMAGE =================================================================================*/}
          <Grid item className={classes.orgImageContainer}>
            <div className={classes.orgImageWrapper}>
              {
                logo ? (
                  <img className={classes.orgImage} src={logo} alt={`Organization Logo cannot be loaded. URI: ${logo}`}/>
                ) : (
                  <img className={classes.orgImage} src={setRandomDefaultImage(id || '0xLOADING', directory || 'hotel')} alt={`Organization from directory: ${directory}`}/>
                )
              }
            </div>
          </Grid>

          {/* TOP-RIGHT-BLOCK: INFO =================================================================================*/}
          <Grid item className={classes.orgInfoContainer}>
            <div className={classes.idInfoContainer}>
              <CopyIdComponent id={id || '0xLOADING'} leftElement={''} fontWeight={500}/>
              {
                canManage || (
                  <div className={classes.publicTrustLevelWrapper}>
                    <Typography variant={'caption'} className={classes.itemTrustInfoTitle}
                                style={{color: colors.greyScale.common}}>Trust level: </Typography>
                    <TrustLevelIcon className={classes.iconTrustLevel}/>
                    <Typography variant={'subtitle2'} className={classes.trustLevelValue}>{proofsQty}</Typography>
                  </div>
                )
              }
            </div>
            <div className={classes.orgNameWrapper}>
              <Typography variant={'h6'} className={classes.orgName} noWrap>{name}</Typography>
            </div>
            <div className={classes.orgAddressWrapper}>
              {addressString &&
              <div>
                <p className={classes.orgAddress}>
                  {addressString}<br />
                  <a href={`https://www.openstreetmap.org/search?query=${addressString}`}
                     className={classes.mapLink}
                     onclick={() => {window.open(`https://www.openstreetmap.org/search?query=${addressString}`, '_blank').focus()}}
                     >show on the map</a>
                </p>
              </div>
              }
              {!addressString &&
              <Typography variant={'caption'} className={classes.orgAddress}>No address specified</Typography>
              }
            </div>
            <div className={classes.orgInfoFieldsContainer}>
              {contacts.phone &&
              <div className={classes.orgInfoFieldWrapper}>
                <Typography variant={'caption'} className={classes.orgInfoFieldTitle} noWrap>
                  {'Phone: '}
                  <a href={`tel:${contacts.phone}`} className={classes.orgInfoField}>{contacts.phone}</a>
                </Typography>
              </div>
              }
              {contacts.email &&
              <div className={classes.orgInfoFieldWrapper}>
                <Typography variant={'caption'} className={classes.orgInfoFieldTitle} noWrap>
                  {'Email: '}
                  <a href={`mailto:${contacts.email}`} className={classes.orgInfoField}>{contacts.email}</a>
                </Typography>
              </div>
              }
              {contacts.website &&
              <div className={classes.orgInfoFieldWrapper} style={{width: '100%'}}>
                <Typography variant={'caption'} className={classes.orgInfoFieldTitle} noWrap>
                  {'Website: '}
                  <a href={website()} target={'_blank'} className={classes.orgInfoField} rel="noopener noreferrer">{contacts.website}</a>
                  {isWebsiteProved &&
                  <TrustLevelIcon className={classes.iconTrustLevel} style={{verticalAlign: 'text-bottom'}}/>}
                </Typography>
              </div>
              }
              {
                isSub ? (
                  <div className={`${classes.orgInfoFieldWrapper} ${classes.orgInfoLegalEntityFieldWrapper}`}>
                    <Typography variant={'caption'} className={classes.orgInfoFieldTitle} style={{maxWidth: '88%'}}
                                noWrap>
                      Legal entity: <Typography variant={'inherit'}
                                                className={classes.orgInfoField}>{entityName}</Typography>
                    </Typography>
                    <div className={classes.entityInfoItem}>
                      <EntityTrustLevelIcon viewBox={'0 0 12 12'} className={classes.entityIcon}/>
                      <Typography variant={'subtitle2'} className={classes.entityValue}>
                        {entityTrustLevel}
                      </Typography>
                    </div>
                  </div>
                ) : null
              }
            </div>
          </Grid>
        </Grid>

        {/* SOCIAL NETWORK LINKS ====================================================================================*/}
        <div className={classes.socialInline}>
          {
            socials.map((social, index) => {
              return (
                <a key={index.toString()} href={social.link} target={'_blank'} className={classes.socialLink} rel="noopener noreferrer">
                  <Hidden xsDown>
                    {icon(social.network)}
                  </Hidden>
                  <Hidden smUp>
                    <div className={classes.mobileSocialWrapper}>
                      {icon(social.network)}
                      {social.verified &&
                      <TrustLevelIcon
                        className={[classes.iconTrustLevel, classes.iconVerify, classes.mobileIconVerify].join(' ')}/>}
                    </div>
                  </Hidden>
                  <Typography variant={'caption'} className={classes.socialTitle}>{social.network}</Typography>
                  {social.verified &&
                  <TrustLevelIcon className={[classes.iconTrustLevel, classes.iconVerify].join(' ')}/>}
                </a>
              )
            })
          }
        </div>
        {canManage && isSub && (description || longDescription) && (
          <Fade in={!isOpen}>
            <div className={classes.toggleOpenDetailsButtonContainer}>
              <Button onClick={() => toggleOpen(!isOpen)} className={classes.toggleOpenDetailsButton}>
                <Typography variant={'inherit'}>
                  Show organization details <MaximizeIcon viewBox={'0 0 20 20'}
                                                          className={classes.iconToggleDetailsOpen}/>
                </Typography>
              </Button>
            </div>
          </Fade>
        )}
      </Container>
      {
        (description || longDescription) ? (
          canManage ? (
            <Collapse in={isOpen} className={classes.detailsContainer}>
              <Container className={classes.detailsContent}>
                <Grid className={classes.detailsGrid} container>
                  <Grid item md={9} xs={12} className={classes.details}>
                    <Typography variant={'inherit'} className={classes.detailsTitle}>{description}</Typography>
                    <Typography variant={'inherit'}>{longDescription}</Typography>
                  </Grid>
                  <Grid className={classes.detailsIllustrationWrapper} item md={3} xs={12}><img
                    src={DetailsIllustration} alt={'Details illustration'}
                    className={classes.detailsIllustration}/>
                  </Grid>
                </Grid>
                <div className={classes.hideDetailsButtonWrapper}>
                  <div className={classes.line}/>
                  <Button onClick={() => toggleOpen(!isOpen)} className={classes.toggleOpenDetailsButton}>
                    <Typography variant={'inherit'}>
                      Hide organization details <MinimizeIcon viewBox={'0 0 20 20'}
                                                              className={classes.iconToggleDetailsOpen}/>
                    </Typography>
                  </Button>
                </div>
              </Container>
            </Collapse>
          ) : (
            <div className={classes.detailsContainer}>
              <Container className={classes.detailsContent}>
                <Grid className={classes.detailsGrid} container>
                  <Grid item md={9} xs={12} className={addCanManageClass(classes.details, classes.detailsCanManage)}>
                    <Typography variant={'inherit'} className={classes.detailsTitle}>{description}</Typography>
                    <Typography variant={'inherit'}>{longDescription}</Typography>
                  </Grid>
                  <Grid className={classes.detailsIllustrationWrapper} item md={3} xs={12}>
                    <img
                      src={DetailsIllustration} alt={'Details illustration'}
                      className={classes.detailsIllustration}/>
                  </Grid>
                </Grid>
                {canManage && <div className={classes.line}/>}
              </Container>
            </div>
          )
        ) : null
      }
    </div>
  )
}

export default Info;
