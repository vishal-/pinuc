"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export default function JoinAsProviderPage() {
  const [formData, setFormData] = useState({
    providerType: "individual",
    name: "",
    businessName: "",
    phone: "",
    email: "",
    serviceCategory: "home-repair",
    servicesOffered: "",
    yearsOfExperience: "",
    description: "",
    location: ""
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Provider Form Submission:", formData);
    alert(
      "Thank you! Your application has been submitted. We'll review it soon."
    );
    setFormData({
      providerType: "individual",
      name: "",
      businessName: "",
      phone: "",
      email: "",
      serviceCategory: "home-repair",
      servicesOffered: "",
      yearsOfExperience: "",
      description: "",
      location: ""
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-2">Join as Provider</h1>
          <p className="text-gray-600 mb-8">
            Register your business with LocalHub and reach more customers
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Provider Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="providerType">Provider Type</Label>
                <Select
                  value={formData.providerType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, providerType: value })
                  }
                >
                  <SelectTrigger id="providerType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="agency">Agency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="serviceCategory">Service Category</Label>
                <Select
                  value={formData.serviceCategory}
                  onValueChange={(value) =>
                    setFormData({ ...formData, serviceCategory: value })
                  }
                >
                  <SelectTrigger id="serviceCategory">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home-repair">Home Repair</SelectItem>
                    <SelectItem value="tutors">Tutors & Teachers</SelectItem>
                    <SelectItem value="events">Event Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Services and Experience */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="servicesOffered">Services Offered *</Label>
                <Input
                  id="servicesOffered"
                  type="text"
                  name="servicesOffered"
                  value={formData.servicesOffered}
                  onChange={handleChange}
                  placeholder="e.g., Installation, Repair, Consultation"
                  required
                />
              </div>

              <div>
                <Label htmlFor="yearsOfExperience">Years of Experience *</Label>
                <Input
                  id="yearsOfExperience"
                  type="number"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location">Service Location *</Label>
              <Input
                id="location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Dwarka, Delhi"
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell us about your services, experience, and what makes you unique..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button type="submit" className="w-full py-3 text-base">
                Submit Application
              </Button>
            </div>
          </form>

          <p className="text-sm text-gray-600 mt-6 text-center">
            By submitting this form, you agree to our terms and conditions.
          </p>
        </div>
      </div>
    </div>
  );
}
