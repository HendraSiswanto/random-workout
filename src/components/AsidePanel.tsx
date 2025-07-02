import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AsideSkeleton from "./AsideSkeleton";

interface ProgramOption {
  label: string;
  type: string;
}

interface Props {
  programIdeas: ProgramOption[];
  onSelect: (type: string) => void;
}



const AsidePanel = ({ programIdeas, onSelect }: Props) => {
  const [isLoading,setLoading] = useState(true)

  useEffect(()=>{
      const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
     return () => clearTimeout(timer);
  },[])

  if (isLoading) return <AsideSkeleton />

  return (
    
    <Box w="250px" p={4} borderRadius="lg" mt={6}>
      <Heading size="sm" mb={4} textAlign='center'>
        Choose Your Flow
      </Heading>
      <VStack align="stretch" spacing={3}>
        {programIdeas.map((prog) => (
          <Button key={prog.type} variant="outline" onClick={() => onSelect(prog.type)}>
            {prog.label}
          </Button>
        ))}
      {}
      
      </VStack>


    </Box>
   
  );
};

export default AsidePanel;