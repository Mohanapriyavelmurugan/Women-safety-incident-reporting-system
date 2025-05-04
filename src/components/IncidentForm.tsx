"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon, Upload, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const formSchema = z.object({
  incidentDate: z.date({
    required_error: "Incident date is required",
  }),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters",
  }),
});

type IncidentFormValues = z.infer<typeof formSchema>;

export const IncidentForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const form = useForm<IncidentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      incidentDate: undefined,
      location: "",
      description: "",
    },
  });

  const onSubmit = (values: IncidentFormValues) => {
    console.log({ ...values, files });

    toast({
      title: "Report submitted",
      description:
        "Your incident report has been submitted successfully. Your case ID is #" +
        Math.floor(100000 + Math.random() * 900000),
    });

    form.reset();
    setFiles([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Incident Date */}
        <FormField
          control={form.control}
          name="incidentDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Incident Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? format(field.value, "PPP") : "Select date"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Select when the incident occurred.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter the location of the incident" {...field} />
              </FormControl>
              <FormDescription>
                Provide as much detail as possible about the location.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please describe the incident in detail"
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Include all relevant details about what happened.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* File Upload */}
        <div>
          <FormLabel className="block mb-2">Evidence (Optional)</FormLabel>
          <div className="border-2 border-dashed rounded-lg p-4 border-gray-300 hover:border-safety-primary transition-colors cursor-pointer">
            <label className="flex flex-col items-center cursor-pointer">
              <Upload className="h-6 w-6 mb-2 text-safety-primary" />
              <span className="text-sm font-medium mb-1">
                Upload photos or videos
              </span>
              <span className="text-xs text-muted-foreground">
                Click to browse or drag and drop
              </span>
              <input
                type="file"
                multiple
                className="hidden"
                accept="image/*,video/*"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {files.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">{files.length} file(s) selected:</p>
              <ul className="space-y-2">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-muted p-2 rounded-md"
                  >
                    <span className="text-sm truncate max-w-[90%]">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Submit */}
        <Button type="submit" className="bg-safety-primary hover:bg-safety-secondary">
          Submit Report
        </Button>
      </form>
    </Form>
  );
};
