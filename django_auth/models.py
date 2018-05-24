# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import six
from django.contrib.auth.models import User as _User
from django.contrib.auth.models import UserManager as _UserManager
from django.utils.translation import ugettext_lazy as _

from django_auth.user_validators import UnicodeUsernameValidator, ASCIIUsernameValidator


def get_admin():
    super_user = User.objects.filter(is_superuser=1).first()
    return super_user


class UserManager(_UserManager):
    def get_system_user(self):
        system = self.model.objects.filter(username='system').first()
        if not system:
            admin = get_admin()
            system = self.model.objects.filter(id=admin.id).first()
        return system


class User(_User):
    username_validator = UnicodeUsernameValidator() if six.PY3 else ASCIIUsernameValidator()

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("User Management")

    objects = UserManager()
