import React from 'react'
import { Button, Container, Flex, HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaPlus } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import FancyText from '@carefully-coded/react-text-gradient';   
import { useColorMode } from '@chakra-ui/react'

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Container maxW="1140px">
        <Flex
          h={16}
          alignItems="center"
          justifyContent="space-between"
          flexDir={{ base: 'column', md: 'row' }}
          textAlign={{ base: 'center', md: 'left' }} // Center items on smaller screens
        >
          <Link to="/">
            <FancyText
              gradient={{ from: 'rgb(136, 177, 190)', to: 'rgb(5, 5, 90)' }} // lightblue to darkblue
              animate
              animateDuration={2000}
              style={{
                fontSize: 'clamp(24px, 5vw, 45px)', // Responsive font size
                fontWeight: 'bold',
              }}
            >
              Product Store
            </FancyText>
          </Link>

          <HStack spacing={4} alignItems="center" mt={{ base: 4, md: 0 }}>
            <Link to={"/create"}>
              <Button
                bg={"rgb(56, 56, 58)"}
                color="white"
                _hover={{ bg: "rgb(6, 7, 7)" }}
              >
                <FaPlus fontSize={20} color="white" />
              </Button>
            </Link>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? (
                <IoMoon size="25" />
              ) : (
                <LuSun size="20" />
              )}
            </Button>
          </HStack>
        </Flex>
      </Container>
    </>
  );
};

export default NavBar;