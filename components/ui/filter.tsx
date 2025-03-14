"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, Search, X } from "lucide-react";
import * as React from "react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Input } from "./input";

export interface FilterOption {
  id: string;
  label: string;
  value: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  type: "checkbox" | "radio" | "button";
  multiSelect?: boolean;
}

interface FilterProps {
  groups: FilterGroup[];
  onFilterChange: (
    groupId: string,
    selectedValues: string[],
    type: "add" | "remove" | "reset"
  ) => void;
  activeFilters: Record<string, string[]>;
  searchPlaceholder?: string;
  onSearch?: (searchTerm: string) => void;
  className?: string;
}

export function Filter({
  groups,
  onFilterChange,
  activeFilters,
  searchPlaceholder = "Search...",
  onSearch,
  className,
}: FilterProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>(
    groups.reduce((acc, group) => ({ ...acc, [group.id]: true }), {})
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const handleOptionChange = (
    groupId: string,
    optionValue: string,
    type: "checkbox" | "radio" | "button",
    multiSelect?: boolean
  ) => {
    const currentValues = activeFilters[groupId] || [];
    
    if (type === "radio" || !multiSelect) {
      // Radio buttons or non-multiselect options replace the current selection
      onFilterChange(groupId, [optionValue], currentValues.includes(optionValue) ? "remove" : "add");
    } else {
      // For checkboxes and multiselect buttons
      if (currentValues.includes(optionValue)) {
        // Remove it if already selected
        onFilterChange(
          groupId,
          currentValues.filter((v) => v !== optionValue),
          "remove"
        );
      } else {
        // Add it if not selected
        onFilterChange(groupId, [...currentValues, optionValue], "add");
      }
    }
  };

  const clearFilter = (groupId: string) => {
    onFilterChange(groupId, [], "reset");
  };

  const clearAllFilters = () => {
    Object.keys(activeFilters).forEach((groupId) => {
      clearFilter(groupId);
    });
  };

  const hasActiveFilters = Object.values(activeFilters).some(
    (values) => values.length > 0
  );

  return (
    <div className={cn("filter-container", className)}>
      {onSearch && (
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              className="pl-9 bg-background"
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-7 w-7 p-0"
                onClick={() => {
                  setSearchTerm("");
                  if (onSearch) onSearch("");
                }}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
        </div>
      )}

      {hasActiveFilters && (
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {Object.entries(activeFilters)
            .filter(([_, values]) => values.length > 0)
            .map(([groupId, values]) => {
              const group = groups.find((g) => g.id === groupId);
              if (!group) return null;

              return values.map((value) => {
                const option = group.options.find((o) => o.value === value);
                if (!option) return null;

                return (
                  <Badge
                    key={`${groupId}-${value}`}
                    variant="outline"
                    className="flex items-center gap-1 px-2 py-1"
                  >
                    <span className="text-xs">
                      {group.label}: {option.label}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() =>
                        handleOptionChange(
                          groupId,
                          value,
                          group.type,
                          group.multiSelect
                        )
                      }
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">
                        Remove {option.label} filter
                      </span>
                    </Button>
                  </Badge>
                );
              });
            })}
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-muted-foreground hover:text-foreground"
            onClick={clearAllFilters}
          >
            Clear all
          </Button>
        </div>
      )}

      <div className="filter-section">
        {groups.map((group) => (
          <div key={group.id} className="py-3 first:pt-0 last:pb-0">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleGroup(group.id)}
            >
              <h3 className="filter-header">{group.label}</h3>
              <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
                {expandedGroups[group.id] ? (
                  <ChevronRight className="h-4 w-4 transform -rotate-90" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>

            {expandedGroups[group.id] && (
              <div className="filter-group mt-2">
                {group.type === "button" ? (
                  <div className="flex flex-wrap gap-2">
                    {group.options.map((option) => {
                      const isActive = (activeFilters[group.id] || []).includes(
                        option.value
                      );
                      return (
                        <Button
                          key={option.id}
                          variant={isActive ? "default" : "outline"}
                          size="sm"
                          className={cn(
                            isActive && "bg-primary/10 text-primary border-primary/30",
                            !isActive && "bg-background",
                            "text-sm"
                          )}
                          onClick={() =>
                            handleOptionChange(
                              group.id,
                              option.value,
                              group.type,
                              group.multiSelect
                            )
                          }
                        >
                          {option.label}
                          {option.count !== undefined && (
                            <span className="ml-1 text-xs text-muted-foreground">
                              ({option.count})
                            </span>
                          )}
                        </Button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-1">
                    {group.options.map((option) => {
                      const isActive = (activeFilters[group.id] || []).includes(
                        option.value
                      );
                      return (
                        <div key={option.id} className="filter-option">
                          <Checkbox
                            id={`${group.id}-${option.id}`}
                            checked={isActive}
                            onCheckedChange={() =>
                              handleOptionChange(
                                group.id,
                                option.value,
                                group.type,
                                group.multiSelect
                              )
                            }
                          />
                          <label
                            htmlFor={`${group.id}-${option.id}`}
                            className={cn(
                              "text-sm cursor-pointer flex justify-between items-center w-full",
                              isActive && "text-primary"
                            )}
                          >
                            <span>{option.label}</span>
                            {option.count !== undefined && (
                              <span className="text-xs text-muted-foreground">
                                ({option.count})
                              </span>
                            )}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 