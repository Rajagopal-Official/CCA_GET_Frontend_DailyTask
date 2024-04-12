import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  backgroundColor: '#AFD198',
}));

const StyledCardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
}));

const StyledCard = styled(Card)(({ theme, isSelected }) => ({
  width: isSelected ? '450px' : '300px',
  height: isSelected ? '360px' : '250px',
  borderRadius: '25px',
  overflow: 'hidden',
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
  margin: theme.spacing(0, 2),
  backgroundColor: isSelected ? '#ECCA9C' : 'transparent',
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  flex: 1,
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  margin: '0 auto',
  marginTop: theme.spacing(1),
}));

const ControlsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledViewAllButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
}));

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data.products.slice(0, 10)));
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex((currentIndex - 1 + products.length) % products.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % products.length);
  };

  const handleViewAll = () => {
    setShowAll(true);
  };

  const handleCloseViewAll = () => {
    setShowAll(false);
  };

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <StyledBox>
      {showAll ? (
        <Grid container spacing={4} sx={{ padding: '35px', paddingRight: '20px', margin: 'auto' }}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card style={{ width: '300px', height: '400px' }}>
                <CardMedia
                  component="img"
                  image={product.thumbnail}
                  alt={product.title}
                />
                <CardContent>
                  <Typography variant="h6" align="center" fontWeight="bold">
                    {product.title.toUpperCase()}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                  >
                    BRAND: {product.brand.toUpperCase()}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                  >
                    PRICE: ${product.price}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                  >
                    RATING: {product.rating}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                  >
                    CATEGORY: {product.category.toUpperCase()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Button variant="contained" onClick={handleCloseViewAll} sx={{ height: '25px', width: '55px', top: '200px' }}>Back</Button>
        </Grid>
      ) : (
        <>
          <StyledCardContainer>
            {products
              .slice(currentIndex, currentIndex + 3)
              .map((product, index) => (
                <StyledCard key={product.id} isSelected={index === 1}>
                  <StyledCardMedia
                    component="img"
                    image={product.thumbnail}
                    alt={product.title}
                  />
                  <StyledCardContent>
                    <Typography variant="h6" align="center" fontWeight="bold">
                      {product.title.toUpperCase()}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      align="center"
                    >
                      BRAND: {product.brand.toUpperCase()}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      align="center"
                    >
                      PRICE: ${product.price}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      align="center"
                    >
                      RATING: {product.rating}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      align="center"
                    >
                      CATEGORY: {product.category.toUpperCase()}
                    </Typography>
                  </StyledCardContent>
                </StyledCard>
              ))}
          </StyledCardContainer>
          <ControlsContainer>
            <IconButton onClick={handlePrevClick} disabled={currentIndex === 0}>
              <ArrowBackIcon />
            </IconButton>
            <StyledViewAllButton variant="contained" onClick={handleViewAll}>
              View All
            </StyledViewAllButton>
            <IconButton
              onClick={handleNextClick}
              disabled={currentIndex > products.length - 3}
            >
              <ArrowForwardIcon />
            </IconButton>
          </ControlsContainer>
        </>
      )}
    </StyledBox>
  );
};

export default ProductCarousel;
