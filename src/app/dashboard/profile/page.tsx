
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";

export default function ProfilePage() {
  // Placeholder data - in a real app, this would come from an API
  const [employeeData, setEmployeeData] = useState({
    employeeId: "BFS001",
    fullName: "Rohan Verma",
    email: "rohan.verma@bharatfirstshield.com",
    role: "Cybersecurity Analyst",
    department: "Security Operations",
    joiningDate: "2023-01-15",
    phone: "+91 9876543210",
    address: "123 Tech Street, Cyberabad, India"
  });

  // In a real app, this would be determined by user's role from auth context
  const isHRAccess = false; // Set to true to simulate HR view

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployeeData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to update employee data
    console.log("Updated employee data:", employeeData);
    alert("Personal information updated successfully! (Placeholder)");
  };

  return (
    <div className="space-y-6">
      <CardHeader className="px-0">
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          View your personal details. For any changes, please contact HR.
        </CardDescription>
      </CardHeader>

      {!isHRAccess && (
        <Alert>
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Read-Only Access</AlertTitle>
          <AlertDescription>
            You are viewing your personal information. To update any details, please contact the HR department.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div>
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input id="employeeId" name="employeeId" value={employeeData.employeeId} disabled />
            </div>
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" value={employeeData.fullName} onChange={handleInputChange} disabled={!isHRAccess} />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" value={employeeData.email} onChange={handleInputChange} disabled={!isHRAccess} />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input id="role" name="role" value={employeeData.role} disabled />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Input id="department" name="department" value={employeeData.department} disabled />
            </div>
            <div>
              <Label htmlFor="joiningDate">Joining Date</Label>
              <Input id="joiningDate" name="joiningDate" type="date" value={employeeData.joiningDate} onChange={handleInputChange} disabled={!isHRAccess} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" value={employeeData.phone} onChange={handleInputChange} disabled={!isHRAccess} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" value={employeeData.address} onChange={handleInputChange} disabled={!isHRAccess} />
            </div>
          </CardContent>
          {isHRAccess && (
            <CardFooter className="border-t px-6 py-4">
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          )}
        </Card>
      </form>
    </div>
  );
}
