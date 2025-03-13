"use client";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionDivider } from "@/components/ui/section-divider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, useInView } from "framer-motion";
import { ArrowUpDown, Download, FileText, Search } from "lucide-react";
import { useRef, useState } from "react";
// Sample resources data
const resources = [
    {
        id: 1,
        title: "Leadership Development Guide",
        description: "A comprehensive guide to developing essential leadership skills.",
        category: "guides",
        fileType: "PDF",
        fileSize: "2.4 MB",
        downloadUrl: "#",
        date: "2024-03-15",
    },
    {
        id: 2,
        title: "Mentorship Program Handbook",
        description: "Guidelines and best practices for mentors and mentees.",
        category: "handbooks",
        fileType: "PDF",
        fileSize: "3.1 MB",
        downloadUrl: "#",
        date: "2024-02-20",
    },
    {
        id: 3,
        title: "Event Planning Checklist",
        description: "A detailed checklist for organizing successful professional events.",
        category: "templates",
        fileType: "XLSX",
        fileSize: "1.2 MB",
        downloadUrl: "#",
        date: "2024-01-10",
    },
    {
        id: 4,
        title: "Networking Strategies Presentation",
        description: "Effective strategies for building and maintaining professional networks.",
        category: "presentations",
        fileType: "PPTX",
        fileSize: "5.7 MB",
        downloadUrl: "#",
        date: "2023-12-05",
    },
    {
        id: 5,
        title: "Professional Development Plan Template",
        description: "A template for creating personalized professional development plans.",
        category: "templates",
        fileType: "DOCX",
        fileSize: "0.8 MB",
        downloadUrl: "#",
        date: "2023-11-18",
    },
    {
        id: 6,
        title: "Leadership Research Report",
        description: "Findings from our annual research on leadership trends and practices.",
        category: "research",
        fileType: "PDF",
        fileSize: "4.2 MB",
        downloadUrl: "#",
        date: "2023-10-30",
    },
];
const categories = [
    { value: "all", label: "All Resources" },
    { value: "guides", label: "Guides" },
    { value: "templates", label: "Templates" },
    { value: "handbooks", label: "Handbooks" },
    { value: "presentations", label: "Presentations" },
    { value: "research", label: "Research" },
];
export default function ResourcesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("desc");
    const filteredResources = resources
        .filter((resource) => {
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
        return matchesSearch && matchesCategory;
    })
        .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    const toggleSortOrder = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };
    return (<div className="container-wide mx-auto py-16">
      <AnimatedHeading title="Resources & Downloads" subtitle="Access our collection of resources designed to support your professional development journey." align="center" underline/>

      <SectionDivider className="my-12"/>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <TabsList className="bg-muted h-auto p-1 overflow-x-auto">
            {categories.map((category) => (<TabsTrigger key={category.value} value={category.value} onClick={() => setSelectedCategory(category.value)} className="px-4 py-2">
                {category.label}
              </TabsTrigger>))}
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
              <Input type="text" placeholder="Search resources..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 w-full md:w-64"/>
            </div>

            <Button variant="outline" size="icon" onClick={toggleSortOrder} title={`Sort by date: ${sortOrder === "asc" ? "Oldest first" : "Newest first"}`}>
              <ArrowUpDown className="h-4 w-4"/>
            </Button>
          </div>
        </div>

        {categories.map((category) => (<TabsContent key={category.value} value={category.value} className="mt-0">
            <ResourcesList resources={filteredResources}/>
          </TabsContent>))}
      </Tabs>
    </div>);
}
function ResourcesList({ resources }) {
    return (<div className="grid grid-cols-1 gap-4">
      {resources.length > 0 ? (resources.map((resource, index) => (<ResourceCard key={resource.id} resource={resource} index={index}/>))) : (<div className="text-center py-12 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground">
            No resources found matching your criteria.
          </p>
        </div>)}
    </div>);
}
function ResourceCard({ resource, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        amount: 0.3,
    });
    return (<motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.6, delay: index * 0.1 }} className="group">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-full text-primary">
            <FileText className="h-6 w-6"/>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-1">{resource.title}</h3>
            <p className="text-muted-foreground text-sm mb-2">
              {resource.description}
            </p>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-muted px-2 py-1 rounded-full">
                {resource.fileType}
              </span>
              <span className="bg-muted px-2 py-1 rounded-full">
                {resource.fileSize}
              </span>
              <span className="bg-muted px-2 py-1 rounded-full">
                {new Date(resource.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })}
              </span>
            </div>
          </div>
        </div>

        <div className="ml-auto">
          <Button asChild variant="outline" size="sm" className="gap-2">
            <a href={resource.downloadUrl} download>
              <Download className="h-4 w-4"/>
              Download
            </a>
          </Button>
        </div>
      </div>
    </motion.div>);
}
