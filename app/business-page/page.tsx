"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, FilterGroup } from "@/components/ui/filter";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { useState } from "react";

interface BusinessItem {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  date: string;
  tags: string[];
}

export default function BusinessPage() {
  // Sample data
  const items: BusinessItem[] = [
    {
      id: "1",
      title: "Financial Report Q2 2023",
      description: "Quarterly financial report for Q2 2023",
      category: "finance",
      status: "completed",
      priority: "high",
      date: "2023-06-30",
      tags: ["report", "financial", "quarterly"],
    },
    {
      id: "2",
      title: "Marketing Campaign Planning",
      description: "Planning for the new product launch campaign",
      category: "marketing",
      status: "in-progress",
      priority: "medium",
      date: "2023-07-15",
      tags: ["marketing", "campaign", "planning"],
    },
    {
      id: "3",
      title: "Product Development Roadmap",
      description: "Strategic roadmap for product development",
      category: "product",
      status: "pending",
      priority: "high",
      date: "2023-08-01",
      tags: ["product", "development", "strategy"],
    },
    {
      id: "4",
      title: "Customer Support Improvement",
      description: "Initiative to improve customer support processes",
      category: "customer",
      status: "in-progress",
      priority: "medium",
      date: "2023-07-20",
      tags: ["customer", "support", "improvement"],
    },
    {
      id: "5",
      title: "HR Policy Update",
      description: "Updates to company HR policies and procedures",
      category: "hr",
      status: "completed",
      priority: "low",
      date: "2023-06-15",
      tags: ["hr", "policy", "update"],
    },
    {
      id: "6",
      title: "Vendor Contract Negotiation",
      description: "Negotiation of terms with key vendors",
      category: "procurement",
      status: "pending",
      priority: "high",
      date: "2023-08-10",
      tags: ["vendor", "contract", "negotiation"],
    },
  ];

  // Filter configuration
  const filterGroups: FilterGroup[] = [
    {
      id: "category",
      label: "Category",
      type: "checkbox",
      multiSelect: true,
      options: [
        { id: "finance", label: "Finance", value: "finance", count: 1 },
        { id: "marketing", label: "Marketing", value: "marketing", count: 1 },
        { id: "product", label: "Product", value: "product", count: 1 },
        { id: "customer", label: "Customer", value: "customer", count: 1 },
        { id: "hr", label: "HR", value: "hr", count: 1 },
        { id: "procurement", label: "Procurement", value: "procurement", count: 1 },
      ],
    },
    {
      id: "status",
      label: "Status",
      type: "button",
      options: [
        { id: "completed", label: "Completed", value: "completed", count: 2 },
        { id: "in-progress", label: "In Progress", value: "in-progress", count: 2 },
        { id: "pending", label: "Pending", value: "pending", count: 2 },
      ],
    },
    {
      id: "priority",
      label: "Priority",
      type: "checkbox",
      options: [
        { id: "high", label: "High", value: "high", count: 3 },
        { id: "medium", label: "Medium", value: "medium", count: 2 },
        { id: "low", label: "Low", value: "low", count: 1 },
      ],
    },
  ];

  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (
    groupId: string,
    selectedValues: string[],
    type: "add" | "remove" | "reset"
  ) => {
    setActiveFilters((prev) => ({ ...prev, [groupId]: selectedValues }));
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Apply filters to items
  const filteredItems = items.filter((item) => {
    // Text search
    if (
      searchTerm &&
      !item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !item.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    ) {
      return false;
    }

    // Category filter
    if (
      activeFilters.category?.length > 0 &&
      !activeFilters.category.includes(item.category)
    ) {
      return false;
    }

    // Status filter
    if (
      activeFilters.status?.length > 0 &&
      !activeFilters.status.includes(item.status)
    ) {
      return false;
    }

    // Priority filter
    if (
      activeFilters.priority?.length > 0 &&
      !activeFilters.priority.includes(item.priority)
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto py-4 px-4 md:px-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Business Portal</h1>
          <ThemeToggle variant="button" />
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-1/4">
            <Filter
              groups={filterGroups}
              onFilterChange={handleFilterChange}
              activeFilters={activeFilters}
              onSearch={handleSearch}
              searchPlaceholder="Search items..."
              className="sticky top-6"
            />
          </aside>

          <section className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">
                Items{" "}
                <span className="text-muted-foreground font-normal">
                  ({filteredItems.length})
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredItems.length === 0 ? (
                <Card className="p-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No items found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters or search term.
                    </p>
                  </div>
                </Card>
              ) : (
                filteredItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle>{item.title}</CardTitle>
                        <Badge
                          variant="outline"
                          className={
                            item.priority === "high"
                              ? "bg-destructive/10 text-destructive border-destructive/30"
                              : item.priority === "medium"
                              ? "bg-primary/10 text-primary border-primary/30"
                              : "bg-muted text-muted-foreground"
                          }
                        >
                          {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                        </Badge>
                      </div>
                      <CardDescription className="mt-1">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground">Category:</span>
                          <span className="font-medium capitalize">
                            {item.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground">Status:</span>
                          <span
                            className={
                              item.status === "completed"
                                ? "text-green-600 dark:text-green-400 font-medium"
                                : item.status === "pending"
                                ? "text-amber-600 dark:text-amber-400 font-medium"
                                : "text-blue-600 dark:text-blue-400 font-medium"
                            }
                          >
                            {item.status.replace("-", " ").split(" ").map(word => 
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(" ")}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground">Date:</span>
                          <span className="font-medium">
                            {new Date(item.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <Separator />
                    <CardFooter className="pt-3">
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto text-primary"
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-card border-t border-border mt-auto">
        <div className="container mx-auto py-6 px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2023 Business Portal. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                Terms
              </Button>
              <Button variant="ghost" size="sm">
                Privacy
              </Button>
              <Button variant="ghost" size="sm">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 