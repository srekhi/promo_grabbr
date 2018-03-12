from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from promotion_companies.enums import CompanyName
from promotion_companies.models import UserCompany


class UserCompaniesView(APIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (JSONRenderer,)

    def _is_valid(self, companyNames):
        if not (companyNames and isinstance(companyNames, list)):
            return Response('Please provide a list of companies', status=status.HTTP_400_BAD_REQUEST)

        validCompanyNames = {company.value for company in CompanyName}
        if set(companyNames).difference(validCompanyNames):
            return Response('Unsupported company', status=status.HTTP_400_BAD_REQUEST)

        return True

    def get(self, request, format=None):
        user = self.request.user

        companies = UserCompany.objects.filter(user=user, active=True).all()
        companyNames = [company.companyName for company in companies]

        return Response(companyNames)

    def put(self, request, format=None):
        user = self.request.user
        companyNames = self.request.data.get('company_names')

        self._is_valid(companyNames)

        userCompanies = [UserCompany(user=user, companyName=companyName) for companyName in companyNames]
        UserCompany.objects.bulk_create(userCompanies)

        return Response()

    def delete(self, request, format=None):
        user = self.request.user
        companyNames = self.request.data.get('company_names')

        self._is_valid(companyNames)

        UserCompany.objects.filter(user=user, companyName__in=[companyNames]).update(active=False)

        return Response()
