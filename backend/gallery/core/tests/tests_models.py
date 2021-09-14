from django.test import TestCase
from core.models import Book, Person
from django.contrib.auth.models import User

class PersonTestCase(TestCase):

    def setUp(self) -> None:
        user = User.objects.create(first_name="Tester", username="teste", password="teste")
        Person.objects.create(user=user)

    def test_person_registed(self):
        result = len(Person.objects.all())
        self.assertNotEquals(result, 0, 'Should person registered count don´t be empty')

    def test_user_data_is_valid(self):
        person = Person.objects.get(pk=1)
        self.assertEqual(person.name, 'Tester', 'Should name is valid')
        self.assertEqual(person.image, '', 'Should image is Null')


class InvitationTestCase(TestCase):

    def create_person_aux(self, name, username):
        user = User.objects.create(first_name=name, username=username, password="teste")
        return Person.objects.create(user=user)

    def setUp(self) -> None:
        self.person_01 = self.create_person_aux('Tester 01', 'Tester 01')
        self.person_02 = self.create_person_aux('Tester 02', 'Tester 02')
        self.person_01.invite(self.person_02)

    def test_person_02_has_invite(self):
        invites = self.person_02.received_invitations.all()
        friends = self.person_02.friends.all()
        self.assertEquals(len(invites), 1, 'Should person_2 has 1 invite')
        self.assertEquals(len(friends), 0, 'Should person_2 has 0 friends')


    def test_accept_invite(self):
        invites = self.person_02.received_invitations.all()
        invites[0].accept()
        friends = self.person_02.friends.all()
        self.assertEquals(len(invites), 0, 'Should person_2 has 0 invite')
        self.assertEquals(len(friends), 1, 'Should person_2 has 1 friends')

    def test_reject_invite(self):
        invites = self.person_02.received_invitations.all()
        invites[0].reject()
        friends = self.person_02.friends.all()
        self.assertEquals(len(invites), 0, 'Should person_2 has 0 invite')
        self.assertEquals(len(friends), 0, 'Should person_2 has 0 friends')


class WeddingTestCase(TestCase):

    def create_person_aux(self, name, username):
        user = User.objects.create(first_name=name, username=username, password="teste")
        return Person.objects.create(user=user)

    def setUp(self) -> None:
        self.person_01 = self.create_person_aux('Tester 01', 'Tester 01')
        self.person_02 = self.create_person_aux('Tester 02', 'Tester 02')
        self.person_01.marriage_proposal(self.person_02)

    def test_person_02_has_marriage_proposal(self):
        invites = self.person_02.received_wedding.all()
        spouse = self.person_02.spouse
        self.assertEquals(len(invites), 1, 'Should person_2 has 1 invite to spouse')
        self.assertEquals(spouse, None, 'Should person_2 not has spouse')

    def test_accept_marriage_proposal(self):
        invites = self.person_02.received_wedding.all()
        invites[0].accept()
        spouse_02 = self.person_02.spouse
        self.assertEquals(len(invites), 0, 'Should person_2 has 0 invite')
        self.assertNotEquals(spouse_02, None, 'Should person_2 has a spouse')

    def test_reject_marriage_proposal(self):
        invites = self.person_02.received_wedding.all()
        invites[0].reject()
        spouse_01 = self.person_01.spouse
        spouse_02 = self.person_02.spouse
        self.assertEquals(len(invites), 0, 'Should person_2 has 0 invite')
        self.assertEquals(spouse_01, None, 'Should person_1 has no spouse')
        self.assertEquals(spouse_02, None, 'Should person_2 has no spouse')

    def test_remove_spouse(self):
        invites = self.person_02.received_wedding.all()
        invites[0].accept()
        spouse_02 = self.person_02.spouse
        self.assertEquals(len(invites), 0, 'Should person_2 has 0 invite')
        self.assertNotEquals(spouse_02, None, 'Should person_2 has a spouse')
        
        person_01 = Person.objects.get(pk=1)
        person_01.remove_spouse()
        person_01 = Person.objects.get(pk=1)
        person_02 = Person.objects.get(pk=2)
        self.assertEquals(person_01.spouse, None, 'Should person_1 has no spouse')
        self.assertEquals(person_02.spouse, None, 'Should person_2 has no spouse')


class BookTestCase(TestCase):

    def create_person(self):
        user = User.objects.create(first_name='Tester', username='tester_01', password="teste")
        return Person.objects.create(user=user)

    def setUp(self) -> None:
        person = self.create_person()
        self.book = Book(
            title='Titulo',
            description='Festa de casamento',
            creator=person,
        )

    def test_book_data_validate(self):
        self.assertEquals(self.book.title, 'Titulo', 'Should title is valid')
        self.assertEquals(self.book.cover_image, None, 'Should image is empty')
