"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/frontend/components/ui/card"
import { Badge } from "@/app/frontend/components/ui/badge"
import { Button } from "@/app/frontend/components/ui/button"
import { ExternalLink, MapPin, Phone, Mail, Calendar, Building, Globe } from "lucide-react"

interface RTOInfo {
  id: number
  name: string
  code: string
  abn?: string
  website?: string
  phone?: string
  email?: string
  address_line1?: string
  address_line2?: string
  city?: string
  state?: string
  postcode?: string
  country?: string
  description?: string
  established_date?: string
  registration_status?: string
  asqa_registration?: string
}

interface RTOInfoCardProps {
  rto: RTOInfo
}

export function RTOInfoCard({ rto }: RTOInfoCardProps) {
  const formatAddress = () => {
    const parts = [rto.address_line1, rto.address_line2, rto.city, rto.state, rto.postcode].filter(Boolean)
    return parts.join(", ")
  }

  const formatEstablishedDate = () => {
    if (!rto.established_date) return null
    return new Date(rto.established_date).getFullYear()
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{rto.name}</CardTitle>
            <CardDescription className="text-base">
              RTO Code: <span className="font-medium">{rto.code}</span>
            </CardDescription>
          </div>
          <Badge
            className={
              rto.registration_status === "Active"
                ? "bg-green-100 text-green-800 border-green-200"
                : "bg-gray-100 text-gray-800 border-gray-200"
            }
          >
            {rto.registration_status || "Active"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {rto.description && <p className="text-sm text-gray-600 leading-relaxed">{rto.description}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-900">Contact Information</h4>

            {rto.phone && (
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>{rto.phone}</span>
              </div>
            )}

            {rto.email && (
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>{rto.email}</span>
              </div>
            )}

            {formatAddress() && (
              <div className="flex items-start space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <span>{formatAddress()}</span>
              </div>
            )}

            {rto.website && (
              <div className="flex items-center space-x-2 text-sm">
                <Globe className="h-4 w-4 text-gray-400" />
                <Button
                  variant="link"
                  className="p-0 h-auto text-blue-600 hover:text-blue-800"
                  onClick={() => window.open(rto.website, "_blank")}
                >
                  Visit Website
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>
            )}
          </div>

          {/* Registration Details */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-900">Registration Details</h4>

            {rto.asqa_registration && (
              <div className="flex items-center space-x-2 text-sm">
                <Building className="h-4 w-4 text-gray-400" />
                <span>{rto.asqa_registration}</span>
              </div>
            )}

            {rto.abn && (
              <div className="flex items-center space-x-2 text-sm">
                <Building className="h-4 w-4 text-gray-400" />
                <span>ABN: {rto.abn}</span>
              </div>
            )}

            {formatEstablishedDate() && (
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>Established: {formatEstablishedDate()}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
