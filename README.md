# django-auth

This project is still under-development.

## Introduction

Added fields country_code, mobile to django_auth.models.User(User)

Added register, login page using Vue.js

Added register, login, verify code API

Added Aliyun SMS for verify code sending

Added UserAdmin, UserManager

### Author: 234082230@qq.com



# settings.py

```
INSTALLED_APPS = [
    ...

    'django_auth',

    ...
]

TEMPLATES = [
    {
        ...

        'DIRS': ['templates'],

        ...
    }
]

```

# urls.py

```
from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin
from django.views.i18n import JavaScriptCatalog
from django_auth.views.user import UserLoginView, UserLogoutView, UserRegisterView

urlpatterns = [
    url(r'^jsi18n/$', JavaScriptCatalog.as_view(), name='javascript-catalog'),

    url(r'^admin/', admin.site.urls),

    url(r'^login', UserLoginView.as_view()),
    url(r'^register', UserRegisterView.as_view()),
    url(r'^logout', UserLogoutView.as_view()),

    url(r'^api/auth/', include('django_auth.urls', namespace='django-auth')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

# Aliyun SMS
## settings.py
```
ACCESS_KEY_ID = ''
ACCESS_KEY_SECRET = ''
REGION = ''
SMS_SIGN = ''

SMS_TPL_LOGIN_CN_ID = ['SMS_XXX']
SMS_TPL_LOGIN_FOREIGN_ID = ['SMS_XXX']
SMS_TPL_FORGETPASSWD_CN_ID = ['SMS_XXX']
SMS_TPL_FORGETPASSWD_FOREIGN_ID = ['SMS_XXX']
SMS_TPL_REGISTER_CN_ID = ['SMS_XXX']
SMS_TPL_REGISTER_FOREIGN_ID = ['SMS_XXX']
```
##
