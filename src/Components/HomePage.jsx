import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();

    return (
        <>
            {/* navbar of page */}
            <Box>
                <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: '0px 4px 4px -2px rgba(0, 0, 0, 0.3)' }}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Box
                            sx={{
                                height: { md: '40px' },
                                width: { md: '150px' },
                                display: { xs: 'none', md: 'flex' },
                                gap: "0px",
                                alignItems: 'center',
                            }}
                        >
                            <img src="/logo.gif" alt="Logo" style={{ marginRight: '0px', width: '60px', height: '60px', }} />
                            <Typography variant="body1" fontWeight="bold" sx={{ color: '#76ff03', marginTop: '8px', fontSize: '25px', }}>QuizMaker</Typography>
                        </Box>
                        <Box sx={{ ml: 'auto' }}>
                            <Typography variant="h6" component={RouterLink} to="/" sx={{ textDecoration: 'none', color: location.pathname === '/' ? 'blue' : 'black', marginRight: '20px', fontSize: { xs: '13px', md: '21px' } }}>
                                Home
                            </Typography>
                            <Typography variant="h6" component={RouterLink} to="/MyQuizes" sx={{ textDecoration: 'none', color: location.pathname === '/MyQuizes' ? 'blue' : 'black', marginRight: '20px', fontSize: { xs: '13px', md: '21px' } }}>
                                My Quizzes
                            </Typography>
                        </Box>
                    </Toolbar>
                </AppBar>


                {/* main section starts here */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <Box sx={{ width: '80vw', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center', alignItems: 'center', marginTop: { xs: '40px', md: '90px' }, }} height={{ xs: '75vh', md: '70vh' }}>
                        <Box sx={{
                            width: { xs: '40vw', md: '27vw' }, margin: "2vh", borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '5px 5px 5px 5px rgba(0, 0, 0, 0.5)',
                            "&:hover": {
                                width: { xs: '41vw', md: '28vw' },
                                height: { xs: '37vh', md: '44vh' }
                            }
                        }} height={{ xs: '35vh', md: '43vh' }} marginBottom={{ xs: '7px', md: '13px' }} >
                            <Box component={RouterLink}
                                to="/CreateQuiz"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: 'url("/newquize.jpg")',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    borderRadius: '10px',
                                    marginBottom: '13px'
                                }}>
                            </Box>
                            <Typography sx={{ marginBottom: '10px' }} fontSize={{ xs: '12px', md: '18px' }}  >Create New Quize</Typography>
                        </Box>

                        <Box sx={{
                            width: { xs: '40vw', md: '27vw' }, margin: "2vh", borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '5px 5px 5px 5px rgba(0, 0, 0, 0.5)',
                            "&:hover": {
                                width: { xs: '41vw', md: '28vw' },
                                height: { xs: '37vh', md: '44vh' }
                            }
                        }} height={{ xs: '35vh', md: '43vh' }} marginBottom={{ xs: '7px', md: '13px' }}>
                            <Box component={RouterLink}
                                to="/MyQuizes"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: 'url("/myquizes.jpg")',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    borderRadius: '10px',
                                    marginBottom: '13px'
                                }} />
                            <Typography sx={{ marginBottom: '10px' }} fontSize={{ xs: '12px', md: '18px' }}>My Quizes</Typography>
                        </Box>

                        <Box sx={{
                            width: { xs: '40vw', md: '27vw' }, margin: "2vh", borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '5px 5px 5px 5px rgba(0, 0, 0, 0.5)',
                            "&:hover": {
                                width: { xs: '41vw', md: '28vw' },
                                height: { xs: '37vh', md: '44vh' }
                            }
                        }} height={{ xs: '35vh', md: '43vh' }} marginBottom={{ xs: '7px', md: '13px' }}>
                            <Box component={RouterLink}
                                to="/PlayQuize"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: 'url("/playquize.jpg")',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    borderRadius: '10px',
                                    marginBottom: '13px'

                                }}>
                            </Box>
                            <Typography sx={{ marginBottom: '10px' }} fontSize={{ xs: '12px', md: '18px' }}>Play Quize</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Navbar;
