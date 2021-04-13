import {NavbarWrapper,Information,List,LeftWrapper,InputWrapper,Input,ImageProfile} from './Navbar.style';
import Logo from '../Logo/Logo';
import {useStore} from '../../context/auth';
import { useState } from 'react';
import {useSearchLazyQuery} from '../../generated/graphql'
import { matchPath, RouteComponentProps, withRouter} from "react-router-dom";
import{Tooltip, InputBase,CircularProgress, Grid, Typography} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import React from 'react';
import {device} from '../../utils/device';


const useStyles = makeStyles((theme) => ({
    input: {
        height: 28,
        fontSize: "14px !important",
        background: "rgba(var(--b3f,250,250,250),1)",
        border: "solid 1px rgba(var(--b6a,219,219,219),1)",
        borderRadius: 3,
        color: "rgba(var(--i1d,38,38,38),1)",
        outline: 0,
        padding: "3px 3px 3px 26px",
        zIndex: 2,
        display:"flex",
        alignContent:"center",
        marginTop:"2rem",
        width:"1000px",
        [`@media ${device.mobile}`]:{
        
          display:'none'
          
        }
        
      
    },

    resultLink: {
        background: "#fafafa",
        width: "100%",
        borderBottom: "solid 1px rgba(var(--b38,219,219,219),1)",
        "&:hover": {
          background: "rgba(var(--b3f,250,250,250),1)",
        },
      },



}))

const WhiteTooltip = withStyles({
    arrow: {
        color: "#fff",
        filter: "drop-shadow(1px 0px 2px #ccc)",
      },
      tooltip: {
        backgroundColor: "#fff",
        color: "#000",
        padding: 0,
        cursor:"pointer",
        boxShadow: "0 0 5px 1px rgba(var(--jb7,0,0,0),.0975)",
      },
      [`@media ${device.mobile}`]:{
        
       display:'none'
       
     }



  })(Tooltip);



const Navbar:React.FC<any> = (props:RouteComponentProps) => {
const {state,signout} = useStore();
const [searchi,setSearch] = useState("");
const [results,setResults] = useState<any>([]);
const[search,{data,loading,error}]=useSearchLazyQuery()
const hasResults = Boolean(searchi) && results.length > 0;

const classes = useStyles();

const{username,avatar}=(state.user);

const handleClick=()=>{
    signout();
}


React.useEffect(() => {
    if (!searchi.trim()) return;
   
    const variables = { data: `%${searchi}%` };
    search({ variables });
    if (data) {
      setResults(data.search);
      
    }
    
  }, [searchi, search]);


   
    return(
       <NavbarWrapper>
           <LeftWrapper >
              
              <div onClick={()=>props.history.push("/")}>
               <Logo />
              </div>
           
              
            </LeftWrapper>
            
            <WhiteTooltip
               
                arrow
                interactive
                open={hasResults}
                title={
                    hasResults&&(
                        <Grid container>
                          {results.map((result:any) => (
                            <Grid
                              key={result.id}
                              item
                              className={classes.resultLink}
                              onClick={() => {
                                props.history.push(`${props.match.path}shop/${result.id}`);
                                setResults([]);
                              }}
                              
                            >
                              <div style={{padding:"2rem"}}>
                                
                                <div>
                                  <Typography variant="body1">{result.title}</Typography>
                                 
                                </div>
                              </div>
                            </Grid>
                          ))}
                        </Grid>
                      )
                    }
            >
                
            
            <InputBase
          
                    className={classes.input}
                    startAdornment={<span><SearchIcon/></span>}
                    onChange={(event) => setSearch(event.target.value)}
                    
                    placeholder="Search"
                    value={searchi}
                /> 
            </WhiteTooltip>   
              
           <div>
               <Information>
                   <List><span><ImageProfile src={avatar}/></span>{username}</List>
                   <List onClick={handleClick}>Logout</List>
               </Information> 
           </div>
       </NavbarWrapper>
    )
}
export default withRouter(Navbar);