import { Box, Button, Container, Heading, Text, VStack  ,useColorModeValue, useToast} from "@chakra-ui/react"
import React, { use } from "react"
import FancyText from '@carefully-coded/react-text-gradient'; 
import { useState } from "react";
import { useProductStore } from "../../store/products";
const CreatePage = () => {
    const [product, setProduct] = useState(
        {
            name: "",
            price: "",
            image: "",
        }
    )
  const {createProduct} = useProductStore()
  const toast = useToast()
  const handleOnSubmit = async () => {
    try {
      const { success, message } = await createProduct(product); // Await the asynchronous function
      console.log(success, message);
  
      if (!success) {
        toast({
          title: "Error",
          description: message, // Use "description" instead of "message" for Chakra UI toasts
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Success",
          description: message, // Use "description" instead of "message" for Chakra UI toasts
          status: "success",
          duration: 2000,
          isClosable: true,
        });
  
        // Reset the product form
        setProduct({
          name: "",
          price: "",
          image: "",
        });
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        title: "Error",
        description: "An error occurred while creating the product.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW={'container.md'} 
    
    > 
        <VStack spacing={8}>
            <Heading as={"h1"} textAlign={'center'} mt={8}>Add New Product</Heading>
            <Box
                borderWidth={1}
                borderRadius="lg"
                p={8}
                boxShadow="lg"
                bg={useColorModeValue("white", "gray.800")}
                w="100%"
                maxW="md"
            > 
            
            <VStack spacing={4} align="stretch">
  <input
    type="text"
    name="name"
    placeholder="Product Name"
    value={product.name}
    onChange={(e) => setProduct({ ...product, name: e.target.value })}
    required
    style={{
      padding: '0.75rem',
      borderRadius: '8px',
      border: '1px solid #CBD5E0',
      fontSize: '1rem',
      outline: 'none',
      width: '100%',
      boxSizing: 'border-box',
    }}
  />

  <input
    type="text"
    name="price"
    placeholder="Price"
    value={product.price}
    onChange={(e) => setProduct({ ...product, price: e.target.value })}
    required
    style={{
      padding: '0.75rem',
      borderRadius: '8px',
      border: '1px solid #CBD5E0',
      fontSize: '1rem',
      outline: 'none',
      width: '100%',
      boxSizing: 'border-box',
    }}
  />

  <input
    type="text"
    name="image"
    placeholder="Image URL"
    value={product.image}
    onChange={(e) => setProduct({ ...product, image: e.target.value })}
    required
    style={{
      padding: '0.75rem',
      borderRadius: '8px',
      border: '1px solid #CBD5E0',
      fontSize: '1rem',
      outline: 'none',
      width: '100%',
      boxSizing: 'border-box',
    }}
  />

  <Button
    type="submit"onClick={handleOnSubmit}
    bg="teal.500"
    color="white"
    borderRadius="8px"
    padding="0.75rem"
    fontSize="1rem"       

    colorScheme="teal"
    _hover={{ bg: 'teal.600' }}
  >
    Submit
  </Button>
</VStack>


            
              </Box>

        </VStack>

    </Container>
  )
}

export default CreatePage
