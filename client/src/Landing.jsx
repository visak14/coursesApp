import Carousel from 'react-material-ui-carousel';
import { Paper,  Box,  } from '@mui/material';


const items = [
    { src: '../public/Study.png', alt: 'Slide 1' },
    { src: 'https://www.shutterstock.com/image-photo/elearning-education-internet-lessons-online-600nw-2158034833.jpg', alt: 'Slide 2' },
    {src:'https://images.unsplash.com/photo-1588702547919-26089e690ecc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Slide 3'},
    { src: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Slide 4' },
    { src: 'https://c1.wallpaperflare.com/preview/471/703/720/e-learning-training-school-online-learn-knowledge.jpg', alt: 'Slide 5' },
];

const Landing = () => {
    return (
        <Box sx={{ position: 'relative', width: '99%' }}>
            <Carousel
                indicators={true}
                navButtonsAlwaysVisible={true}
                navButtonsProps={{
                    style: {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                    }
                }}
            
            >
                {items.map((item, index) => (
                    <Paper key={index} sx={{ height: { xs: '56', md: '96' }, overflow: 'hidden' }}>
                        <img
                            src={item.src}
                            alt={item.alt}
                            style={{
                                display: 'block',
                                width: '100vw',
                                height: '90vh',
                                objectFit: 'cover',
                            }}
                        />
                    </Paper>
                ))}
            </Carousel>
        </Box>
    );
};

export default Landing;
