from django import forms
from finance_manager.models.asset import Asset


class AssetForm(forms.ModelForm):
    class Meta:
        model = Asset
        fields = ["ticker", "price", "shares"]

    # widgets = {
    #     "ticker": forms.TextInput(attrs={"class": "form-control"}),
    #     "price": forms.TextInput(attrs={"class": "form-control"}),
    #     "shares": forms.TextInput(attrs={"class": "form-control"}),
    # }
