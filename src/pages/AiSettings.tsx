import React, { useState, useEffect } from 'react';
import {
    Box, Heading, Text, VStack, HStack, Card, FormControl, FormLabel,
    Input, Button, Select, useToast, Flex, Badge,
    useColorMode, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Divider
} from '@chakra-ui/react';
import { FiServer, FiCheckCircle, FiXCircle, FiSave, FiRefreshCw, FiSettings, FiSliders } from 'react-icons/fi';
import { ResponsiveContainer } from '../components/ResponsiveContainer';
import { loadAISettings, saveAISettings, AISettings, resetAISettings } from '../lib/aiSettings';
import { checkServerHealth, getAvailableModels } from '../lib/ollamaIntegration';

const AiSettingsPage: React.FC = () => {
    const { colorMode } = useColorMode();
    const toast = useToast();
    
    const [settings, setSettings] = useState<AISettings>(loadAISettings());
    const [isChecking, setIsChecking] = useState(false);
    const [isServerActive, setIsServerActive] = useState<boolean | null>(null);
    const [availableModels, setAvailableModels] = useState<string[]>([]);
    
    useEffect(() => {
        checkConnection(settings.ollamaUrl);
    }, []);

    const checkConnection = async (url: string) => {
        setIsChecking(true);
        try {
            const isHealthy = await checkServerHealth(url);
            setIsServerActive(isHealthy);
            
            if (isHealthy) {
                const models = await getAvailableModels(url);
                setAvailableModels(models.map(m => m.name));
            } else {
                setAvailableModels([]);
            }
        } catch (error) {
            setIsServerActive(false);
            setAvailableModels([]);
        } finally {
            setIsChecking(false);
        }
    };

    const handleSettingChange = (field: keyof AISettings, value: any) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        saveAISettings(settings);
        toast({
            title: 'Settings Saved',
            description: 'Your AI preferences have been updated globally.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleReset = () => {
        const defaultSettings = resetAISettings();
        if(defaultSettings) setSettings(defaultSettings);
        else setSettings(loadAISettings());
        checkConnection(loadAISettings().ollamaUrl);
        toast({
            title: 'Reset to Defaults',
            status: 'info',
            duration: 2000,
        });
    };

    const bgCard = colorMode === 'dark' ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.02)";
    const borderColor = colorMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';

    return (
        <Box 
            minH="100vh" 
            pt={{ base: '80px', md: '100px' }} 
            pb={{ base: '100px', md: '4xl' }}
            bg={colorMode === 'dark' ? "black" : "gray.50"}
        >
            <ResponsiveContainer>
                <VStack spacing={8} align="stretch">
                    <HStack justify="space-between">
                        <VStack align="start" spacing={1}>
                            <HStack>
                                <FiSettings size={28} color="#970fff" />
                                <Heading size="lg" color={colorMode === 'dark' ? 'white' : 'gray.800'}>
                                    AI Engine Settings
                                </Heading>
                            </HStack>
                            <Text color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>
                                Manage your local Ollama connectivity and model generation parameters.
                            </Text>
                        </VStack>
                        <Button
                            bg="linear-gradient(135deg, #970fff, #7817ff)"
                            color="white"
                            leftIcon={<FiSave />}
                            onClick={handleSave}
                            _hover={{ bg: 'linear-gradient(135deg, #7817ff, #5a0bd9)' }}
                        >
                            Save Settings
                        </Button>
                    </HStack>

                    <Card
                        bg={bgCard}
                        backdropFilter="blur(20px)"
                        border={`1px solid ${borderColor}`}
                        borderRadius="2xl"
                        p={6}
                    >
                        <VStack spacing={6} align="start">
                            <Flex justify="space-between" w="full" align="center">
                                <HStack spacing={3}>
                                    <FiServer size={20} color="#970fff" />
                                    <Heading size="md" color={colorMode === 'dark' ? 'white' : 'gray.800'}>
                                        Ollama Server Connection
                                    </Heading>
                                </HStack>
                                <Badge 
                                    colorScheme={isChecking ? "blue" : isServerActive ? "green" : "red"} 
                                    p={2} px={3} borderRadius="md" display="flex" alignItems="center" gap={2}
                                >
                                    {isChecking ? "Checking..." : isServerActive ? <><FiCheckCircle /> Active</> : <><FiXCircle /> Offline</>}
                                </Badge>
                            </Flex>
                            
                            <FormControl>
                                <FormLabel color={colorMode === 'dark' ? 'white' : 'gray.700'}>
                                    Server URL (Endpoint)
                                </FormLabel>
                                <HStack>
                                    <Input 
                                        value={settings.ollamaUrl} 
                                        onChange={(e) => handleSettingChange('ollamaUrl', e.target.value)}
                                        bg={colorMode === 'dark' ? "rgba(255,255,255,0.05)" : "white"}
                                        color={colorMode === 'dark' ? 'white' : 'black'}
                                        border={`1px solid ${borderColor}`}
                                    />
                                    <Button 
                                        leftIcon={<FiRefreshCw />} 
                                        onClick={() => checkConnection(settings.ollamaUrl)}
                                        isLoading={isChecking}
                                    >
                                        Test
                                    </Button>
                                </HStack>
                            </FormControl>

                            <FormControl>
                                <FormLabel color={colorMode === 'dark' ? 'white' : 'gray.700'}>
                                    Active Model
                                </FormLabel>
                                <Select 
                                    value={settings.ollamaModel}
                                    onChange={(e) => handleSettingChange('ollamaModel', e.target.value)}
                                    bg={colorMode === 'dark' ? "rgba(255,255,255,0.05)" : "white"}
                                    color={colorMode === 'dark' ? 'white' : 'black'}
                                    border={`1px solid ${borderColor}`}
                                >
                                    {availableModels.length > 0 ? availableModels.map(model => (
                                        <option key={model} value={model} style={{ background: colorMode === 'dark' ? '#1a1a1a' : 'white' }}>
                                            {model}
                                        </option>
                                    )) : (
                                        <option value={settings.ollamaModel} style={{ background: colorMode === 'dark' ? '#1a1a1a' : 'white' }}>
                                            {settings.ollamaModel} (Fallback)
                                        </option>
                                    )}
                                </Select>
                            </FormControl>
                        </VStack>
                    </Card>

                    <Card
                        bg={bgCard}
                        backdropFilter="blur(20px)"
                        border={`1px solid ${borderColor}`}
                        borderRadius="2xl"
                        p={6}
                    >
                        <VStack spacing={6} align="start">
                            <HStack spacing={3}>
                                <FiSliders size={20} color="#970fff" />
                                <Heading size="md" color={colorMode === 'dark' ? 'white' : 'gray.800'}>
                                    Advanced Generative Parameters
                                </Heading>
                            </HStack>

                            <FormControl>
                                <FormLabel color={colorMode === 'dark' ? 'white' : 'gray.700'}>
                                    Temperature ({settings.temperature})
                                </FormLabel>
                                <Text fontSize="xs" color="gray.500" mb={2}>Controls randomness: Lower = focused, Higher = creative.</Text>
                                <Slider 
                                    value={settings.temperature} 
                                    min={0} max={2} step={0.1}
                                    onChange={(v) => handleSettingChange('temperature', v)}
                                    colorScheme="purple"
                                >
                                    <SliderTrack><SliderFilledTrack /></SliderTrack>
                                    <SliderThumb />
                                </Slider>
                            </FormControl>
                            
                            <FormControl>
                                <FormLabel color={colorMode === 'dark' ? 'white' : 'gray.700'}>
                                    Top P ({settings.topP})
                                </FormLabel>
                                <Text fontSize="xs" color="gray.500" mb={2}>Limits token selection to a cumulative probability.</Text>
                                <Slider 
                                    value={settings.topP} 
                                    min={0} max={1} step={0.05}
                                    onChange={(v) => handleSettingChange('topP', v)}
                                    colorScheme="purple"
                                >
                                    <SliderTrack><SliderFilledTrack /></SliderTrack>
                                    <SliderThumb />
                                </Slider>
                            </FormControl>

                            <FormControl>
                                <FormLabel color={colorMode === 'dark' ? 'white' : 'gray.700'}>
                                    Context Search Size (Top K): {settings.topK}
                                </FormLabel>
                                <Slider 
                                    value={settings.topK} 
                                    min={1} max={100} step={1}
                                    onChange={(v) => handleSettingChange('topK', v)}
                                    colorScheme="purple"
                                >
                                    <SliderTrack><SliderFilledTrack /></SliderTrack>
                                    <SliderThumb />
                                </Slider>
                            </FormControl>
                            
                            <Divider borderColor={borderColor} />

                            <Flex justify="space-between" w="full">
                                <Button variant="ghost" colorScheme="red" onClick={handleReset}>
                                    Reset to Defaults
                                </Button>
                            </Flex>
                        </VStack>
                    </Card>
                </VStack>
            </ResponsiveContainer>
        </Box>
    );
};

export default AiSettingsPage;
