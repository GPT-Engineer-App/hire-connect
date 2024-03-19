import React, { useState } from "react";
import { Box, Heading, Text, Button, Input, Stack, Grid, Image, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Software Engineer",
      description: "We are looking for a skilled software engineer to join our team.",
      company: "Acme Inc.",
    },
    {
      id: 2,
      title: "Product Manager",
      description: "We are seeking an experienced product manager to lead our new project.",
      company: "XYZ Corp.",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedJob, setSelectedJob] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredJobs = jobs.filter((job) => job.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAddJob = () => {
    setSelectedJob(null);
    onOpen();
  };

  const handleEditJob = (job) => {
    setSelectedJob(job);
    onOpen();
  };

  const handleDeleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const company = form.company.value;

    if (selectedJob) {
      setJobs(jobs.map((job) => (job.id === selectedJob.id ? { ...job, title, description, company } : job)));
    } else {
      const newJob = {
        id: jobs.length + 1,
        title,
        description,
        company,
      };
      setJobs([...jobs, newJob]);
    }

    onClose();
    form.reset();
  };

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={8}>
        Recruitment Platform
      </Heading>
      <Stack direction="row" mb={8}>
        <Input placeholder="Search jobs..." value={searchTerm} onChange={handleSearch} mr={4} />
        <Button leftIcon={<FaSearch />} colorScheme="blue">
          Search
        </Button>
        <Button leftIcon={<FaPlus />} colorScheme="green" onClick={handleAddJob}>
          Add Job
        </Button>
      </Stack>
      <Grid templateColumns="repeat(3, 1fr)" gap={8}>
        {filteredJobs.map((job) => (
          <Box key={job.id} borderWidth={1} borderRadius="lg" p={4}>
            <Image src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxlbXBsb3llZSUyMHBvcnRyYWl0fGVufDB8fHx8MTcxMDg0ODI3MHww&ixlib=rb-4.0.3&q=80&w=1080" alt="Employee" mb={4} />
            <Heading as="h2" size="md" mb={2}>
              {job.title}
            </Heading>
            <Text mb={4}>{job.description}</Text>
            <Text fontWeight="bold">{job.company}</Text>
            <Stack direction="row" mt={4}>
              <IconButton icon={<FaEdit />} aria-label="Edit" onClick={() => handleEditJob(job)} />
              <IconButton icon={<FaTrash />} aria-label="Delete" onClick={() => handleDeleteJob(job.id)} />
            </Stack>
          </Box>
        ))}
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedJob ? "Edit Job" : "Add Job"}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input name="title" defaultValue={selectedJob?.title} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea name="description" defaultValue={selectedJob?.description} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Company</FormLabel>
                <Input name="company" defaultValue={selectedJob?.company} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                {selectedJob ? "Update" : "Add"}
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
