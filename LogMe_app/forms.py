from django import forms
from django.forms.widgets import TextInput, Widget
from .models import LogReg, MealLog
from tempus_dominus.widgets import DatePicker

class RegForm(forms.ModelForm):
    ''' Registration Form '''
    # first_name = forms.CharField(max_length=45, label='First Name', widget=forms.TextInput(attrs={'placeholder': 'Enter your first name...'}))
    # last_name = forms.CharField(max_length=45, label='Last Name',widget=forms.TextInput(attrs={'placeholder': 'Enter your last name...'}))
    # email = forms.EmailField(required=True, widget=forms.TextInput(attrs={'placeholder': 'Email...'}))
    # password = forms.CharField(max_length=255, label='Password', widget=forms.PasswordInput(attrs={'placeholder': 'Password...'}))
    # confirm_password = forms.CharField(max_length=255, label = 'Confirm Password', widget = forms.PasswordInput(attrs = {'placeholder': 'Confirm Password...'} ))

    #reCAPTCHA
    # token = forms.CharField(widget=forms.HiddenInput())

    class Meta:
        model = LogReg
        fields = ['first_name', 'last_name', 'email', 'password', 'confirm_password']
    
    def __init__(self, *args, **kwargs):
        ''' Sets how fields will render and values accepted'''
        super().__init__(*args, **kwargs)
        self.fields['first_name'].widget.attrs.update({'placeholder': 'First name'})
        self.fields['first_name'].label = ''
        self.fields['first_name'].widget.attrs.update({'class': 'field'})
        self.fields['last_name'].widget.attrs.update({'placeholder': 'Last name'})
        self.fields['last_name'].label = ''
        self.fields['last_name'].widget.attrs.update({'class': 'field'})
        self.fields['email'].widget.attrs.update({'id': 'email_logo'})
        self.fields['email'].widget.attrs.update({'placeholder': 'Email Address'})
        self.fields['email'].label = ''
        self.fields['password'].widget.attrs.update({'id': 'password_logo'})
        self.fields['password'].widget.attrs.update( {'placeholder': 'Password'})
        self.fields['password'].label= ''
        # self.fields['password'].widget.attrs.update(size='16')
        self.fields['email'].widget.attrs.update({'class': 'field'})
        self.fields['password'].widget.attrs.update({'class': 'field'})
        self.fields['confirm_password'].widget.attrs.update({'placeholder': 'Confirm Password'})
        self.fields['confirm_password'].label = ''
        self.fields['confirm_password'].widget.attrs.update({'class': 'field'})

class LoginForm(forms.ModelForm):
    ''' Login form '''
    # email = forms.EmailField(required=True, widget=forms.TextInput(attrs={'placeholder': 'Email...'}))
    # password = forms.CharField(label = 'Password', widget=forms.PasswordInput(attrs={'placeholder': 'Password...'}))


    class Meta:
        ''' references email and password fields from the logReg function in the models file'''
        model = LogReg
        fields = ['email', 'password']
    
    def __init__(self, *args, **kwargs):
        ''' Sets how fields will render and values accepted'''
        super().__init__(*args, **kwargs)
        self.fields['email'].widget.attrs.update({'id': 'email_logo'})
        self.fields['email'].widget.attrs.update({'placeholder': 'Email Address'})
        self.fields['email'].label = ''
        self.fields['password'].widget.attrs.update({'id': 'password_logo'})
        self.fields['password'].widget.attrs.update( {'placeholder': 'Password'})
        self.fields['password'].label= ''
        # self.fields['password'].widget.attrs.update(size='16')
        self.fields['email'].widget.attrs.update({'class': 'field'})
        self.fields['password'].widget.attrs.update({'class': 'field'})

class DateInput(forms.DateInput):
    input_type = 'date'

class MealForm(forms.ModelForm):
    ''' Form for the Meals form '''
    class Meta:
        #references the meal_type, meal_name, quantity and date fields from the MealLot model
        model = MealLog
        fields = ['meal_type', 'meal_name', 'mealId','quantity', 'date', 'calories']
    
    def __init__(self, *args, **kwargs):
        ''' Sets how fields will render and values accepted'''
        # To not overide the setting in your Model, specify the model in the super funciton - super user(master)
        super(MealForm, self).__init__(*args, **kwargs)
        widgets = {
            'meal_type': forms.TextInput(attrs = {'class': 'field1'}), 
            'date': DateInput()
        }
        # self.fields['quantity'].widget.attrs.update({
        #     'class': 'field1'
        #     })
        self.fields['meal_name'].widget = TextInput(
           attrs = {
                'class': 'field1',
        })
        self.fields['mealId'].widget = TextInput(
            {
                'class': 'field1',
                'readonly':'True'
            })
        self.fields['quantity'].widget.attrs.update(
            {
                'class': 'field1'
            })
        # date =forms.DateField(
        #     widget = DateInput(
                # DatePicker(
                # options = {
                #     'minDate': '2021-01-01',
                #     'maxDate': '2036-12-31'
                # },
            # attrs={
            #     'class': 'field1',
            #     'label':'Date'
            # }
        #     required=True,
        # input_formats=['%m/%d/%y'],
            # )
            # )
        self.fields['calories'].widget = TextInput(
        attrs={
            'class': 'field1',
            # 'readonly':'True'
        })

class SearchForm(forms.Form):
    ''' SearchForm to fetch results from the API '''
    search_term = forms.CharField(max_length=255, widget=forms.TextInput(attrs={'id': 'search-term', 'placeholder':'Start typing to begin search'}), label ='')