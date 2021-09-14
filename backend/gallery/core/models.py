from django.db import models
from django.contrib.auth.models import User


def upload_image_formater(instance, filename):
    return f'{instance.id}-{filename}'


class Person(models.Model):
    user = models.OneToOneField(User, related_name='person', on_delete=models.CASCADE)
    spouse = models.OneToOneField('self', on_delete=models.CASCADE, blank=True, null=True)
    friends = models.ManyToManyField('self')
    image = models.ImageField(upload_to=upload_image_formater, blank=True, null=True)

    @property
    def name(self):
        return self.user.first_name

    def invite(self, invitation_person):
        invitation = Invitation(requester=self, receiver=invitation_person)
        invitation.save()

    def remove_friend(self, friend):
        self.friends.remove(friend.id)


class Invitation(models.Model):
    requester = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='created_invitations')
    receiver = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='received_invitations')

    def accept(self):
        self.receiver.friends.add(self.requester)
        self.requester.friends.add(self.receiver)
        self.delete()

    def reject(self):
        self.delete()


class Book(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=2500)
    cover_image = models.ImageField(upload_to=upload_image_formater, blank=True, null=True)
    created_at = models.DateField(auto_created=True)
    creator = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='books')


class Photo(models.Model):
    url = models.ImageField(upload_to=upload_image_formater, blank=True, null=True)
    acepted = models.BooleanField(default=False)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='photos')


class Like(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='created_likes')
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE, related_name='received_likes')


class Comment(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='created_comments')
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE, related_name='received_comments')
    created_at = models.DateField(auto_created=True, auto_now_add=True)

    def remove_comment(self):
        self.delete()
