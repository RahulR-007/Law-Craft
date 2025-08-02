import React, { useState } from 'react'
import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    VStack,
    HStack,
    Flex,
    Card,
    Input,
    FormControl,
    FormLabel,
    Select,
    Switch,
    useToast,
    IconButton,
    Avatar,
    Badge,
    Divider,
    Grid,
    GridItem,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
    FiHome,
    FiUser,
    FiSettings,
    FiSave,
    FiEdit,
    FiMail,
    FiPhone,
    FiMapPin,
    FiBriefcase,
    FiShield,
    FiBell,
    FiFileText,
    FiTrendingUp,
    FiActivity
} from 'react-icons/fi'

const MotionBox = motion(Box)

const Profile: React.FC = () => {
    const navigate = useNavigate()
    const toast = useToast()

    const [profile, setProfile] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        company: 'Legal Solutions Inc.',
        position: 'Senior Legal Counsel',
        location: 'New York, NY',
        bio: 'Experienced legal professional specializing in corporate law and contract negotiations.',
        avatar: ''
    })

    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        documentUpdates: true,
        securityAlerts: true,
        marketingEmails: false,
        theme: 'dark',
        language: 'en',
        timezone: 'America/New_York'
    })

    const [isEditing, setIsEditing] = useState(false)

    const handleSaveProfile = () => {
        toast({
            title: 'Profile Updated',
            description: 'Your profile has been successfully updated.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
        setIsEditing(false)
    }

    const handleSaveSettings = () => {
        toast({
            title: 'Settings Saved',
            description: 'Your preferences have been saved.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }

    const stats = [
        {
            label: 'Documents Generated',
            value: '47',
            change: '+12%',
            isIncrease: true,
            icon: FiFileText
        },
        {
            label: 'Active Templates',
            value: '8',
            change: '+3',
            isIncrease: true,
            icon: FiBriefcase
        },
        {
            label: 'Success Rate',
            value: '98.5%',
            change: '+2.1%',
            isIncrease: true,
            icon: FiTrendingUp
        },
        {
            label: 'Total Savings',
            value: '$12,450',
            change: '+$2,100',
            isIncrease: true,
            icon: FiActivity
        }
    ]

    const recentActivity = [
        {
            id: '1',
            type: 'document',
            title: 'Generated Service Agreement',
            timestamp: '2 hours ago',
            status: 'completed'
        },
        {
            id: '2',
            type: 'template',
            title: 'Updated NDA Template',
            timestamp: '5 hours ago',
            status: 'completed'
        },
        {
            id: '3',
            type: 'document',
            title: 'Downloaded Contract PDF',
            timestamp: '1 day ago',
            status: 'completed'
        },
        {
            id: '4',
            type: 'settings',
            title: 'Changed notification preferences',
            timestamp: '2 days ago',
            status: 'completed'
        }
    ]

    return (
        <Box minH="100vh" position="relative">
            {/* Navigation */}
            <Flex
                position="fixed"
                top="0"
                left="0"
                right="0"
                h="70px"
                bg="rgba(0, 0, 0, 0.9)"
                backdropFilter="blur(20px)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                align="center"
                justify="space-between"
                px={8}
                zIndex="1000"
                boxShadow="0 8px 20px rgba(0, 0, 0, 0.3)"
            >
                <Text fontSize="2xl" fontWeight="bold" color="white">
                    Law<Text as="span" color="brand.500">Craft</Text> AI
                </Text>
                <HStack spacing={4}>
                    <IconButton
                        aria-label="Home"
                        icon={<FiHome />}
                        variant="ghost"
                        color="white"
                        onClick={() => navigate('/dashboard')}
                    />
                </HStack>
            </Flex>

            <Container maxW="7xl" pt="100px" pb="20px">
                <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Header Section */}
                    <VStack spacing={8} textAlign="center" mb={12}>
                        <Heading
                            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                            color="white"
                            fontWeight="900"
                        >
                            Your <Text as="span" color="brand.500">Profile</Text>
                        </Heading>
                        <Text fontSize="xl" color="gray.400" maxW="2xl">
                            Manage your account settings, preferences, and view your activity statistics.
                        </Text>
                    </VStack>

                    <Tabs variant="soft-rounded" colorScheme="purple">
                        <TabList
                            bg="rgba(255, 255, 255, 0.05)"
                            backdropFilter="blur(10px)"
                            border="1px solid rgba(255, 255, 255, 0.1)"
                            borderRadius="xl"
                            p={2}
                            mb={8}
                        >
                            <Tab color="gray.400" _selected={{ color: 'white', bg: 'linear-gradient(135deg, #970fff, #7817ff)' }}>
                                <HStack spacing={2}>
                                    <FiUser />
                                    <Text>Profile</Text>
                                </HStack>
                            </Tab>
                            <Tab color="gray.400" _selected={{ color: 'white', bg: 'linear-gradient(135deg, #970fff, #7817ff)' }}>
                                <HStack spacing={2}>
                                    <FiSettings />
                                    <Text>Settings</Text>
                                </HStack>
                            </Tab>
                            <Tab color="gray.400" _selected={{ color: 'white', bg: 'linear-gradient(135deg, #970fff, #7817ff)' }}>
                                <HStack spacing={2}>
                                    <FiActivity />
                                    <Text>Activity</Text>
                                </HStack>
                            </Tab>
                        </TabList>

                        <TabPanels>
                            {/* Profile Tab */}
                            <TabPanel p={0}>
                                <Grid templateColumns={{ base: '1fr', lg: '1fr 2fr' }} gap={8}>
                                    {/* Profile Card */}
                                    <GridItem>
                                        <Card
                                            bg="rgba(255, 255, 255, 0.08)"
                                            backdropFilter="blur(20px)"
                                            border="1px solid rgba(255, 255, 255, 0.2)"
                                            borderRadius="2xl"
                                            p={8}
                                            h="fit-content"
                                        >
                                            <VStack spacing={6}>
                                                <Avatar
                                                    size="2xl"
                                                    name={`${profile.firstName} ${profile.lastName}`}
                                                    bg="linear-gradient(135deg, #970fff, #7817ff)"
                                                    color="white"
                                                />

                                                <VStack spacing={2} textAlign="center">
                                                    <Heading size="lg" color="white">
                                                        {profile.firstName} {profile.lastName}
                                                    </Heading>
                                                    <Text color="gray.400">{profile.position}</Text>
                                                    <Text color="gray.500" fontSize="sm">{profile.company}</Text>

                                                    <Badge
                                                        bg="linear-gradient(135deg, rgba(151, 15, 255, 0.2), rgba(151, 15, 255, 0.1))"
                                                        color="brand.300"
                                                        px={3}
                                                        py={1}
                                                        borderRadius="full"
                                                    >
                                                        Professional Plan
                                                    </Badge>
                                                </VStack>

                                                <Divider borderColor="rgba(255, 255, 255, 0.1)" />

                                                <VStack spacing={3} w="full" align="start">
                                                    <HStack spacing={3}>
                                                        <FiMail color="#970fff" />
                                                        <Text color="gray.300" fontSize="sm">{profile.email}</Text>
                                                    </HStack>
                                                    <HStack spacing={3}>
                                                        <FiPhone color="#970fff" />
                                                        <Text color="gray.300" fontSize="sm">{profile.phone}</Text>
                                                    </HStack>
                                                    <HStack spacing={3}>
                                                        <FiMapPin color="#970fff" />
                                                        <Text color="gray.300" fontSize="sm">{profile.location}</Text>
                                                    </HStack>
                                                </VStack>

                                                <Button
                                                    w="full"
                                                    variant="outline"
                                                    borderColor="rgba(151, 15, 255, 0.4)"
                                                    color="brand.300"
                                                    leftIcon={<FiEdit />}
                                                    onClick={() => setIsEditing(!isEditing)}
                                                    _hover={{
                                                        bg: 'rgba(151, 15, 255, 0.1)',
                                                        borderColor: 'brand.400'
                                                    }}
                                                >
                                                    {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                                                </Button>
                                            </VStack>
                                        </Card>
                                    </GridItem>

                                    {/* Profile Form */}
                                    <GridItem>
                                        <Card
                                            bg="rgba(255, 255, 255, 0.08)"
                                            backdropFilter="blur(20px)"
                                            border="1px solid rgba(255, 255, 255, 0.2)"
                                            borderRadius="2xl"
                                            p={8}
                                        >
                                            <VStack spacing={6} align="start">
                                                <HStack justify="space-between" w="full">
                                                    <Heading size="lg" color="white">Profile Information</Heading>
                                                    {isEditing && (
                                                        <Button
                                                            bg="linear-gradient(135deg, #970fff, #7817ff)"
                                                            color="white"
                                                            leftIcon={<FiSave />}
                                                            onClick={handleSaveProfile}
                                                            _hover={{
                                                                bg: 'linear-gradient(135deg, #7817ff, #5a0bd9)'
                                                            }}
                                                        >
                                                            Save Changes
                                                        </Button>
                                                    )}
                                                </HStack>

                                                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} w="full">
                                                    <FormControl>
                                                        <FormLabel color="white">First Name</FormLabel>
                                                        <Input
                                                            value={profile.firstName}
                                                            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                                                            isReadOnly={!isEditing}
                                                            bg="rgba(255, 255, 255, 0.1)"
                                                            border="1px solid rgba(255, 255, 255, 0.2)"
                                                            color="white"
                                                            _readOnly={{ opacity: 0.7 }}
                                                        />
                                                    </FormControl>

                                                    <FormControl>
                                                        <FormLabel color="white">Last Name</FormLabel>
                                                        <Input
                                                            value={profile.lastName}
                                                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                                                            isReadOnly={!isEditing}
                                                            bg="rgba(255, 255, 255, 0.1)"
                                                            border="1px solid rgba(255, 255, 255, 0.2)"
                                                            color="white"
                                                            _readOnly={{ opacity: 0.7 }}
                                                        />
                                                    </FormControl>
                                                </Grid>

                                                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} w="full">
                                                    <FormControl>
                                                        <FormLabel color="white">Email</FormLabel>
                                                        <Input
                                                            value={profile.email}
                                                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                                            isReadOnly={!isEditing}
                                                            bg="rgba(255, 255, 255, 0.1)"
                                                            border="1px solid rgba(255, 255, 255, 0.2)"
                                                            color="white"
                                                            _readOnly={{ opacity: 0.7 }}
                                                        />
                                                    </FormControl>

                                                    <FormControl>
                                                        <FormLabel color="white">Phone</FormLabel>
                                                        <Input
                                                            value={profile.phone}
                                                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                                            isReadOnly={!isEditing}
                                                            bg="rgba(255, 255, 255, 0.1)"
                                                            border="1px solid rgba(255, 255, 255, 0.2)"
                                                            color="white"
                                                            _readOnly={{ opacity: 0.7 }}
                                                        />
                                                    </FormControl>
                                                </Grid>

                                                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} w="full">
                                                    <FormControl>
                                                        <FormLabel color="white">Company</FormLabel>
                                                        <Input
                                                            value={profile.company}
                                                            onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                                                            isReadOnly={!isEditing}
                                                            bg="rgba(255, 255, 255, 0.1)"
                                                            border="1px solid rgba(255, 255, 255, 0.2)"
                                                            color="white"
                                                            _readOnly={{ opacity: 0.7 }}
                                                        />
                                                    </FormControl>

                                                    <FormControl>
                                                        <FormLabel color="white">Position</FormLabel>
                                                        <Input
                                                            value={profile.position}
                                                            onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                                                            isReadOnly={!isEditing}
                                                            bg="rgba(255, 255, 255, 0.1)"
                                                            border="1px solid rgba(255, 255, 255, 0.2)"
                                                            color="white"
                                                            _readOnly={{ opacity: 0.7 }}
                                                        />
                                                    </FormControl>
                                                </Grid>

                                                <FormControl>
                                                    <FormLabel color="white">Location</FormLabel>
                                                    <Input
                                                        value={profile.location}
                                                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                                        isReadOnly={!isEditing}
                                                        bg="rgba(255, 255, 255, 0.1)"
                                                        border="1px solid rgba(255, 255, 255, 0.2)"
                                                        color="white"
                                                        _readOnly={{ opacity: 0.7 }}
                                                    />
                                                </FormControl>
                                            </VStack>
                                        </Card>
                                    </GridItem>
                                </Grid>
                            </TabPanel>

                            {/* Settings Tab */}
                            <TabPanel p={0}>
                                <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={8}>
                                    <GridItem>
                                        <Card
                                            bg="rgba(255, 255, 255, 0.08)"
                                            backdropFilter="blur(20px)"
                                            border="1px solid rgba(255, 255, 255, 0.2)"
                                            borderRadius="2xl"
                                            p={8}
                                        >
                                            <VStack spacing={6} align="start">
                                                <Heading size="lg" color="white">Notifications</Heading>

                                                <VStack spacing={4} w="full">
                                                    {[
                                                        { key: 'emailNotifications', label: 'Email Notifications', icon: FiMail },
                                                        { key: 'smsNotifications', label: 'SMS Notifications', icon: FiPhone },
                                                        { key: 'documentUpdates', label: 'Document Updates', icon: FiFileText },
                                                        { key: 'securityAlerts', label: 'Security Alerts', icon: FiShield },
                                                        { key: 'marketingEmails', label: 'Marketing Emails', icon: FiBell }
                                                    ].map((setting) => {
                                                        const IconComponent = setting.icon
                                                        return (
                                                            <Flex key={setting.key} justify="space-between" align="center" w="full">
                                                                <HStack spacing={3}>
                                                                    <IconComponent color="#970fff" />
                                                                    <Text color="white">{setting.label}</Text>
                                                                </HStack>
                                                                <Switch
                                                                    isChecked={settings[setting.key as keyof typeof settings] as boolean}
                                                                    onChange={(e) => setSettings({
                                                                        ...settings,
                                                                        [setting.key]: e.target.checked
                                                                    })}
                                                                    colorScheme="purple"
                                                                />
                                                            </Flex>
                                                        )
                                                    })}
                                                </VStack>
                                            </VStack>
                                        </Card>
                                    </GridItem>

                                    <GridItem>
                                        <Card
                                            bg="rgba(255, 255, 255, 0.08)"
                                            backdropFilter="blur(20px)"
                                            border="1px solid rgba(255, 255, 255, 0.2)"
                                            borderRadius="2xl"
                                            p={8}
                                        >
                                            <VStack spacing={6} align="start">
                                                <Heading size="lg" color="white">Preferences</Heading>

                                                <VStack spacing={4} w="full">
                                                    <FormControl>
                                                        <FormLabel color="white">Theme</FormLabel>
                                                        <Select
                                                            value={settings.theme}
                                                            onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                                                            bg="rgba(255, 255, 255, 0.1)"
                                                            border="1px solid rgba(255, 255, 255, 0.2)"
                                                            color="white"
                                                        >
                                                            <option value="dark" style={{ background: '#1a1a1a' }}>Dark</option>
                                                            <option value="light" style={{ background: '#1a1a1a' }}>Light</option>
                                                            <option value="auto" style={{ background: '#1a1a1a' }}>Auto</option>
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl>
                                                        <FormLabel color="white">Language</FormLabel>
                                                        <Select
                                                            value={settings.language}
                                                            onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                                                            bg="rgba(255, 255, 255, 0.1)"
                                                            border="1px solid rgba(255, 255, 255, 0.2)"
                                                            color="white"
                                                        >
                                                            <option value="en" style={{ background: '#1a1a1a' }}>English</option>
                                                            <option value="es" style={{ background: '#1a1a1a' }}>Spanish</option>
                                                            <option value="fr" style={{ background: '#1a1a1a' }}>French</option>
                                                            <option value="de" style={{ background: '#1a1a1a' }}>German</option>
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl>
                                                        <FormLabel color="white">Timezone</FormLabel>
                                                        <Select
                                                            value={settings.timezone}
                                                            onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                                                            bg="rgba(255, 255, 255, 0.1)"
                                                            border="1px solid rgba(255, 255, 255, 0.2)"
                                                            color="white"
                                                        >
                                                            <option value="America/New_York" style={{ background: '#1a1a1a' }}>Eastern Time</option>
                                                            <option value="America/Chicago" style={{ background: '#1a1a1a' }}>Central Time</option>
                                                            <option value="America/Denver" style={{ background: '#1a1a1a' }}>Mountain Time</option>
                                                            <option value="America/Los_Angeles" style={{ background: '#1a1a1a' }}>Pacific Time</option>
                                                        </Select>
                                                    </FormControl>
                                                </VStack>

                                                <Button
                                                    w="full"
                                                    bg="linear-gradient(135deg, #970fff, #7817ff)"
                                                    color="white"
                                                    leftIcon={<FiSave />}
                                                    onClick={handleSaveSettings}
                                                    _hover={{
                                                        bg: 'linear-gradient(135deg, #7817ff, #5a0bd9)'
                                                    }}
                                                >
                                                    Save Settings
                                                </Button>
                                            </VStack>
                                        </Card>
                                    </GridItem>
                                </Grid>
                            </TabPanel>

                            {/* Activity Tab */}
                            <TabPanel p={0}>
                                <VStack spacing={8}>
                                    {/* Stats Cards */}
                                    <Grid templateColumns={{ base: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }} gap={6} w="full">
                                        {stats.map((stat, index) => {
                                            const IconComponent = stat.icon
                                            return (
                                                <Card
                                                    key={index}
                                                    bg="rgba(255, 255, 255, 0.08)"
                                                    backdropFilter="blur(20px)"
                                                    border="1px solid rgba(255, 255, 255, 0.2)"
                                                    borderRadius="xl"
                                                    p={6}
                                                >
                                                    <Stat>
                                                        <Flex justify="space-between" align="start" mb={2}>
                                                            <StatLabel color="gray.400" fontSize="sm">
                                                                {stat.label}
                                                            </StatLabel>
                                                            <Box
                                                                bg="rgba(151, 15, 255, 0.2)"
                                                                p={2}
                                                                borderRadius="lg"
                                                                border="1px solid rgba(151, 15, 255, 0.3)"
                                                            >
                                                                <IconComponent size={16} color="#970fff" />
                                                            </Box>
                                                        </Flex>
                                                        <StatNumber color="white" fontSize="2xl" fontWeight="bold">
                                                            {stat.value}
                                                        </StatNumber>
                                                        <StatHelpText color="gray.400" mb={0}>
                                                            <StatArrow type={stat.isIncrease ? 'increase' : 'decrease'} />
                                                            {stat.change}
                                                        </StatHelpText>
                                                    </Stat>
                                                </Card>
                                            )
                                        })}
                                    </Grid>

                                    {/* Recent Activity */}
                                    <Card
                                        bg="rgba(255, 255, 255, 0.08)"
                                        backdropFilter="blur(20px)"
                                        border="1px solid rgba(255, 255, 255, 0.2)"
                                        borderRadius="2xl"
                                        p={8}
                                        w="full"
                                    >
                                        <VStack spacing={6} align="start">
                                            <Heading size="lg" color="white">Recent Activity</Heading>

                                            <VStack spacing={4} w="full">
                                                {recentActivity.map((activity) => (
                                                    <Flex
                                                        key={activity.id}
                                                        justify="space-between"
                                                        align="center"
                                                        w="full"
                                                        p={4}
                                                        bg="rgba(255, 255, 255, 0.05)"
                                                        borderRadius="lg"
                                                        border="1px solid rgba(255, 255, 255, 0.1)"
                                                    >
                                                        <HStack spacing={4}>
                                                            <Box
                                                                bg="rgba(151, 15, 255, 0.2)"
                                                                p={2}
                                                                borderRadius="lg"
                                                                border="1px solid rgba(151, 15, 255, 0.3)"
                                                            >
                                                                <FiFileText size={16} color="#970fff" />
                                                            </Box>
                                                            <VStack align="start" spacing={0}>
                                                                <Text color="white" fontWeight="medium">
                                                                    {activity.title}
                                                                </Text>
                                                                <Text color="gray.400" fontSize="sm">
                                                                    {activity.timestamp}
                                                                </Text>
                                                            </VStack>
                                                        </HStack>
                                                        <Badge
                                                            bg="rgba(34, 197, 94, 0.2)"
                                                            color="green.300"
                                                            px={3}
                                                            py={1}
                                                            borderRadius="full"
                                                        >
                                                            {activity.status}
                                                        </Badge>
                                                    </Flex>
                                                ))}
                                            </VStack>
                                        </VStack>
                                    </Card>
                                </VStack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </MotionBox>
            </Container>
        </Box>
    )
}

export default Profile
